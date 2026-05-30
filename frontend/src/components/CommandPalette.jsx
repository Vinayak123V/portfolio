import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HomeIcon, UserIcon, BriefcaseIcon, EnvelopeIcon, BoltIcon } from "./SvgIcons";

const commands = [
  { id: "home", title: "Go to Home", section: "hero", icon: <HomeIcon /> },
  { id: "about", title: "View Profile", section: "about-profile", icon: <UserIcon /> },
  { id: "skills", title: "Explore Skills", section: "about", icon: <BoltIcon /> },
  { id: "projects", title: "See Projects", section: "projects", icon: <BriefcaseIcon /> },
  { id: "contact", title: "Contact Me", section: "contact", icon: <EnvelopeIcon /> }
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredCommands = commands.filter(cmd => 
    cmd.title.toLowerCase().includes(query.toLowerCase())
  );

  const executeCommand = (cmd) => {
    setIsOpen(false);
    setQuery("");
    
    // Check if we are not on home page
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(cmd.section);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } else {
      const el = document.getElementById(cmd.section);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[20vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-xl bg-white/[0.05] border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl flex flex-col"
          >
            <div className="flex items-center px-4 border-b border-white/10">
              <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input
                autoFocus
                type="text"
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none px-4 py-4 text-foreground placeholder-text-muted text-lg font-light"
              />
              <div className="text-[10px] text-text-muted font-mono uppercase bg-white/5 px-2 py-1 rounded">ESC</div>
            </div>

            <div className="max-h-[300px] overflow-y-auto p-2 scrollbar-hide">
              {filteredCommands.length === 0 ? (
                <div className="text-center py-8 text-text-muted text-sm">No results found.</div>
              ) : (
                <div className="flex flex-col gap-1">
                  {filteredCommands.map((cmd) => (
                    <button
                      key={cmd.id}
                      onClick={() => executeCommand(cmd)}
                      className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/10 text-left transition-colors outline-none focus:bg-white/10 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-text-muted group-hover:text-accent group-hover:bg-accent/10 transition-colors">
                        {cmd.icon}
                      </div>
                      <span className="text-foreground font-medium flex-1">{cmd.title}</span>
                      <svg className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="border-t border-white/5 p-3 flex items-center gap-4 text-xs text-text-muted">
              <span className="flex items-center gap-1"><kbd className="bg-white/10 px-1.5 py-0.5 rounded text-foreground font-sans font-medium text-[10px]">↑</kbd><kbd className="bg-white/10 px-1.5 py-0.5 rounded text-foreground font-sans font-medium text-[10px]">↓</kbd> Navigate</span>
              <span className="flex items-center gap-1"><kbd className="bg-white/10 px-1.5 py-0.5 rounded text-foreground font-sans font-medium text-[10px]">↵</kbd> Select</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
