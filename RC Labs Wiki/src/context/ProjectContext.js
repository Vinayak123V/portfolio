import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { authEvents } from './AuthContext';

const ProjectContext = createContext();
const API = 'http://localhost:5000/api';

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error('useProjects must be used within a ProjectProvider');
  return context;
};

const getToken = () => localStorage.getItem('rc_token');

const apiFetch = (path, options = {}) => {
  const token = getToken();
  return fetch(`${API}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
};

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [history, setHistory]   = useState([]);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/projects');
      if (!res.ok) throw new Error('Failed to load projects');
      setProjects(await res.json());
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchHistory = useCallback(async () => {
    try {
      const res = await apiFetch('/history');
      if (res.ok) setHistory(await res.json());
    } catch {}
  }, []);

  const clearHistory = async () => {
    await apiFetch('/history', { method: 'DELETE' });
    setHistory([]);
  };

  useEffect(() => {
    if (getToken()) { fetchProjects(); fetchHistory(); }
    else { setProjects([]); setLoading(false); }

    const onLogin  = () => { fetchProjects(); fetchHistory(); };
    const onLogout = () => { setProjects([]); setHistory([]); setLoading(false); };
    authEvents.addEventListener('login', onLogin);
    authEvents.addEventListener('logout', onLogout);
    return () => {
      authEvents.removeEventListener('login', onLogin);
      authEvents.removeEventListener('logout', onLogout);
    };
  }, [fetchProjects, fetchHistory]);

  const addProject = async (project) => {
    const res = await apiFetch('/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create project');
    setProjects(prev => [...prev, data]);
    fetchHistory();
    return data;
  };

  const updateProject = async (projectId, updatedProject, historyAction) => {
    const body = historyAction ? { ...updatedProject, _historyAction: historyAction } : updatedProject;
    const res = await apiFetch(`/projects/${projectId}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update project');
    setProjects(prev => prev.map(p => p.id === projectId ? data : p));
    fetchHistory();
    return data;
  };

  const deleteProject = async (projectId) => {
    const res = await apiFetch(`/projects/${projectId}`, { method: 'DELETE' });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || 'Failed to delete project');
    }
    setProjects(prev => prev.filter(p => p.id !== projectId));
    fetchHistory();
  };

  const getProjectsByStatus = (statuses) =>
    projects.filter(p => statuses.includes(p.status));

  const getProjectsByCategory = (category, statuses) =>
    projects.filter(p => p.category === category && statuses.includes(p.status));

  return (
    <ProjectContext.Provider value={{
      projects, loading, error,
      history, fetchHistory, clearHistory,
      fetchProjects,
      addProject, updateProject, deleteProject,
      getProjectsByStatus, getProjectsByCategory,
    }}>
      {children}
    </ProjectContext.Provider>
  );
};
