import React from 'react';
import { 
  Scissors, Type, Music, Sparkles, Wand2, Film, Zap, HelpCircle 
} from 'lucide-react';
import { Tool } from '../../types';

interface ToolsSidebarProps {
  onToolSelect: (toolId: string) => void;
  activeToolId: string;
}

export const ToolsSidebar: React.FC<ToolsSidebarProps> = ({ onToolSelect, activeToolId }) => {
  const tools: Tool[] = [
    { id: 'cut', icon: Scissors, label: 'Cut', shortcut: 'C', action: 'cut' },
    { id: 'text', icon: Type, label: 'Text', shortcut: 'T', action: 'text' },
    { id: 'audio', icon: Music, label: 'Audio', shortcut: 'A', action: 'audio' },
    { id: 'ai', icon: Sparkles, label: 'AI Tools', shortcut: 'I', action: 'ai' },
    { id: 'effects', icon: Wand2, label: 'Effects', shortcut: 'E', action: 'effects' },
    { id: 'transitions', icon: Film, label: 'Transitions', shortcut: 'R', action: 'transitions' },
    { id: 'speed', icon: Zap, label: 'Speed', shortcut: 'D', action: 'speed' },
  ];

  return (
    <div className="w-20 bg-gradient-to-b from-bg-secondary via-bg-secondary to-bg-tertiary border-r border-border/50 flex flex-col items-center py-6 h-full z-20 relative">
      {/* Logo */}
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center mb-8 shadow-glow cursor-pointer hover:scale-105 transition-transform">
        <Film className="w-7 h-7 text-white" />
      </div>
      
      {/* Tools */}
      <div className="flex flex-col items-center gap-6 flex-1 w-full overflow-y-auto no-scrollbar">
        {tools.map((tool, idx) => (
          <React.Fragment key={tool.id}>
            <ToolButton 
              tool={tool} 
              isActive={activeToolId === tool.id}
              onClick={() => onToolSelect(tool.id)} 
            />
            {/* Divider after Audio tool (index 2) */}
            {idx === 2 && <div className="w-10 h-px bg-border/30 shrink-0" />}
          </React.Fragment>
        ))}
      </div>
      
      {/* Bottom Actions */}
      <div className="flex flex-col items-center gap-4 mt-6">
        <button className="w-12 h-12 rounded-xl bg-bg-tertiary/50 hover:bg-bg-tertiary hover:scale-110 transition-all flex items-center justify-center group text-text-secondary hover:text-white">
          <HelpCircle className="w-6 h-6 group-hover:text-accent-primary transition-colors" />
        </button>
      </div>
    </div>
  );
};

interface ToolButtonProps {
  tool: Tool;
  isActive: boolean;
  onClick: () => void;
}

const ToolButton: React.FC<ToolButtonProps> = ({ tool, isActive, onClick }) => {
  const Icon = tool.icon;
  
  return (
    <button
      onClick={onClick}
      className={`
        w-14 h-14 rounded-xl flex items-center justify-center group relative transition-all duration-200
        ${isActive 
          ? 'bg-gradient-to-br from-accent-primary to-accent-secondary text-white shadow-glow scale-110' 
          : 'bg-bg-tertiary/30 hover:bg-accent-primary/20 hover:scale-110 active:scale-95 text-text-secondary hover:text-white'
        }
      `}
    >
      <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'group-hover:text-accent-primary'} transition-colors`} />
      
      {/* Tooltip */}
      <div className="absolute left-full ml-4 px-3 py-2 bg-bg-tertiary border border-border rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg z-50">
        <p className="text-sm font-medium text-text-primary">{tool.label}</p>
        {tool.shortcut && (
          <div className="flex items-center mt-1">
             <kbd className="text-[10px] text-text-secondary px-1.5 py-0.5 bg-bg-secondary rounded border border-border/50">{tool.shortcut}</kbd>
          </div>
        )}
      </div>
    </button>
  );
};