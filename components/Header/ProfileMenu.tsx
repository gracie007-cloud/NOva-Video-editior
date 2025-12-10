import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Settings, Sun, Moon, Clock, Keyboard, LogOut } from 'lucide-react';

interface ProfileMenuProps {
    onOpenSettings: () => void;
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({ onOpenSettings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDarkMode(!isDarkMode);
    // In a real app, this would toggle a class on the html element
  };

  const handleSettingsClick = () => {
    setIsOpen(false);
    onOpenSettings();
  }

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
            w-10 h-10 rounded-xl transition-all flex items-center justify-center
            ${isOpen ? 'bg-bg-tertiary text-white' : 'bg-bg-tertiary/50 hover:bg-bg-tertiary text-text-secondary hover:text-white'}
        `}
      >
        <MoreVertical size={20} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-bg-secondary/95 border border-border/50 rounded-2xl shadow-glass overflow-hidden backdrop-blur-xl z-50 origin-top-right animate-in fade-in zoom-in-95 duration-200">
          {/* Profile Section */}
          <div className="p-4 border-b border-border/50 bg-gradient-to-br from-accent-primary/10 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent-primary to-accent-secondary flex items-center justify-center text-white font-semibold shadow-md">
                VP
              </div>
              <div>
                <p className="font-medium text-text-primary">Video Pro User</p>
                <p className="text-xs text-text-secondary">pro@videoai.com</p>
              </div>
            </div>
          </div>
          
          <div className="py-2">
            {/* Settings */}
            <button 
                onClick={handleSettingsClick}
                className="w-full px-4 py-2.5 hover:bg-bg-tertiary/50 flex items-center gap-3 transition-all group text-text-secondary hover:text-text-primary text-sm"
            >
              <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              <span>Settings</span>
            </button>
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="w-full px-4 py-2.5 hover:bg-bg-tertiary/50 flex items-center justify-between transition-all text-text-secondary hover:text-text-primary text-sm"
            >
              <div className="flex items-center gap-3">
                {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
              </div>
              {/* Switch UI Mockup */}
              <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${isDarkMode ? 'bg-accent-primary' : 'bg-bg-tertiary'}`}>
                <div className={`w-3 h-3 rounded-full bg-white shadow-sm transition-transform ${isDarkMode ? 'translate-x-4' : 'translate-x-0'}`} />
              </div>
            </button>
            
            {/* History */}
            <button className="w-full px-4 py-2.5 hover:bg-bg-tertiary/50 flex items-center gap-3 transition-all text-text-secondary hover:text-text-primary text-sm">
              <Clock className="w-4 h-4" />
              <span>Export History</span>
            </button>
            
            {/* Shortcuts */}
            <button className="w-full px-4 py-2.5 hover:bg-bg-tertiary/50 flex items-center gap-3 transition-all text-text-secondary hover:text-text-primary text-sm">
              <Keyboard className="w-4 h-4" />
              <span>Keyboard Shortcuts</span>
              <kbd className="ml-auto text-[10px] bg-bg-tertiary border border-border px-1.5 py-0.5 rounded text-text-secondary">?</kbd>
            </button>
          </div>
          
          {/* Divider */}
          <div className="h-px bg-border/50 mx-2" />
          
          {/* Logout */}
          <div className="py-2">
            <button className="w-full px-4 py-2.5 hover:bg-error/10 flex items-center gap-3 text-error transition-all text-sm">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
