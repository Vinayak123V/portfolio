# RC Labs Wiki - Project Management Implementation Guide

## Overview
The RC Labs Wiki now has a fully integrated project management system with shared state across all project sections.

## Project Context System

### Shared Data Store
All projects are now managed through a centralized `ProjectContext` that provides:
- Single source of truth for all projects
- Automatic routing based on project status
- Real-time updates across all sections

### Project Status Flow

```
When creating/editing a project:

Status: "Active" or "Aborted"
  ↓
  Appears in: Active Projects Section

Status: "Withheld"
  ↓
  Appears in: Withheld Projects Section

Status: "Completed"
  ↓
  Appears in: Completed Projects Section
```

## How It Works

### 1. Creating a New Project
1. Navigate to Active Projects or Withheld Projects
2. Click "+ Add New Project" button
3. Fill in the form with project details
4. Select status from dropdown:
   - Active
   - Withheld
   - Aborted
   - Completed
5. Click "Create Project"
6. Project automatically appears in the correct section based on status

### 2. Editing Project Status
1. Click on any project card
2. Click "Edit" button
3. Change the status dropdown
4. Click "Save Changes"
5. Project automatically moves to the new section

### 3. Project Sections

#### Active Projects (`/project-documentation/active-projects`)
- Shows projects with status: Active or Aborted
- Includes deadline warnings
- Full CRUD operations (Create, Read, Update, Delete)
- Warning action buttons (Keep, Extend, Remove)

#### Withheld Projects (`/project-documentation/withheld-projects`)
- Shows projects with status: Withheld
- Yellow/amber color scheme
- Includes "Withheld Reason" field
- Full edit and delete capabilities

#### Completed Projects (`/project-documentation/completed-projects`)
- Shows projects with status: Completed
- Green color scheme with achievement highlights
- Read-only view (can edit to change status)
- Includes "Achievements & Impact" section

## Key Features

### Automatic Project Routing
- Projects automatically appear in the correct section based on their status
- No manual moving required
- Real-time updates across all sections

### Status-Based Filtering
- Each section only shows relevant projects
- Active Projects: Excludes Completed and Withheld
- Withheld Projects: Only shows Withheld
- Completed Projects: Only shows Completed

### Category Organization
- All sections support Software/Hardware categories
- Category counts update automatically
- Consistent UI across all sections

## Technical Implementation

### Context Provider
```javascript
<ProjectProvider>
  <Router>
    <Layout>
      <Routes>
        // All routes
      </Routes>
    </Layout>
  </Router>
</ProjectProvider>
```

### Available Context Methods
- `projects` - Array of all projects
- `addProject(project)` - Add new project
- `updateProject(id, project)` - Update existing project
- `deleteProject(id)` - Delete project
- `getProjectsByStatus(statuses)` - Filter by status
- `getProjectsByCategory(category, statuses)` - Filter by category and status

## Usage Example

### Creating a Withheld Project
1. Go to Active Projects or Withheld Projects
2. Click "+ Add New Project"
3. Fill in:
   - Name: "New Battery Tech Research"
   - Category: Software (auto-selected based on section)
   - Status: Withheld
   - Withheld Reason: "Awaiting patent approval"
   - Other details...
4. Click "Create Project"
5. Project appears in Withheld Projects section under Software category

### Moving Project from Withheld to Active
1. Go to Withheld Projects
2. Click on the project card
3. Click "Edit"
4. Change Status from "Withheld" to "Active"
5. Click "Save Changes"
6. Project disappears from Withheld Projects
7. Project now appears in Active Projects

## Benefits

1. **Centralized Management**: All projects in one data store
2. **Automatic Organization**: Projects route themselves based on status
3. **Real-time Updates**: Changes reflect immediately across all sections
4. **Consistent Experience**: Same UI patterns across all project types
5. **Easy Status Changes**: Simple dropdown to move projects between sections

## Future Enhancements

Potential additions:
- Project history/audit log
- Status change notifications
- Project templates
- Bulk operations
- Export/import functionality
- Advanced filtering and search
- Project analytics dashboard
