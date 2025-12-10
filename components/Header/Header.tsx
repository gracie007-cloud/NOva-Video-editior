import React, { useState, useRef, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { ProfileMenu } from './ProfileMenu';

interface HeaderProps {
    onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  const [projectName, setProjectName] = useState("Summer_2025.mp4");
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(projectName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (tempName.trim()) {
      setProjectName(tempName);
    } else {
      setTempName(projectName); // Revert if empty
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setTempName(projectName);
      setIsEditing(false);
    }
  };

  return (
    <header className="h-16 border-b border-border/50 bg-bg-secondary/50 backdrop-blur-md flex items-center justify-between px-6 z-30 shrink-0 relative">
        {/* Left Side: Status Badge */}
        <div className="flex items-center w-1/3">
             <span className="text-xs px-2 py-0.5 rounded-full bg-bg-tertiary text-text-secondary border border-border/30 flex items-center gap-1 cursor-default select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
                Saved
            </span>
        </div>

        {/* Center: Editable Project Name */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
             <div 
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-bg-tertiary/30 transition-colors cursor-pointer group"
                onClick={() => !isEditing && setIsEditing(true)}
             >
                <span className="text-sm font-medium text-text-secondary select-none">Project:</span>
                
                {isEditing ? (
                  <input
                    ref={inputRef}
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent text-lg font-semibold text-text-primary outline-none border-b border-accent-primary min-w-[200px] text-center pb-0.5"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                     <h1 className="text-lg font-semibold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent truncate max-w-[300px]">
                        {projectName}
                     </h1>
                     <Pencil size={12} className="text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
             </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center justify-end gap-4 w-1/3">
            <div className="hidden md:flex items-center text-sm font-medium text-accent-primary bg-accent-primary/10 px-3 py-1.5 rounded-lg border border-accent-primary/20">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary"></span>
                </span>
                AI Assistant Ready
            </div>
            
            <div className="w-px h-8 bg-border/50 mx-1" />
            
            <ProfileMenu onOpenSettings={onOpenSettings} />
        </div>
    </header>
  );
};