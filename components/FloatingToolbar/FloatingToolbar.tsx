import React from 'react';
import { 
  Scissors, Type, Music, Film, Zap, Sparkles, Eraser, Palette, 
  Crop, RotateCw, Volume2, Split, Trash2, MousePointer2, Image,
  Layers, Copy, Undo, Redo, Monitor, Wand2, ArrowRightLeft,
  Settings2, BoxSelect
} from 'lucide-react';
import { useDraggable } from '../../hooks/useDraggable';

interface FloatingToolbarProps {
  onToolSelect: (toolId: string) => void;
}

export const FloatingToolbar: React.FC<FloatingToolbarProps> = ({ onToolSelect }) => {
  // Start position near bottom center
  const { position, handleMouseDown, isDragging } = useDraggable({ x: 350, y: 480 });

  const toolCategories = [
    {
      id: 'essentials',
      label: 'Essentials',
      tools: [
        { id: 'select', icon: MousePointer2, label: 'Select' },
        { id: 'split', icon: Scissors, label: 'Split' },
        { id: 'cut', icon: BoxSelect, label: 'Cut' },
        { id: 'delete', icon: Trash2, label: 'Delete' },
        { id: 'undo', icon: Undo, label: 'Undo' },
        { id: 'redo', icon: Redo, label: 'Redo' },
      ]
    },
    {
      id: 'insert',
      label: 'Insert',
      tools: [
        { id: 'text', icon: Type, label: 'Text' },
        { id: 'audio', icon: Music, label: 'Audio' },
        { id: 'image', icon: Image, label: 'Image' },
        { id: 'video', icon: Monitor, label: 'Video' },
        { id: 'shapes', icon: Layers, label: 'Shapes' },
      ]
    },
    {
      id: 'adjust',
      label: 'Adjust',
      tools: [
        { id: 'speed', icon: Zap, label: 'Speed' },
        { id: 'crop', icon: Crop, label: 'Crop' },
        { id: 'rotate', icon: RotateCw, label: 'Rotate' },
        { id: 'volume', icon: Volume2, label: 'Volume' },
        { id: 'color', icon: Palette, label: 'Color' },
      ]
    },
    {
      id: 'enhance',
      label: 'Enhance',
      tools: [
        { id: 'transitions', icon: ArrowRightLeft, label: 'Trans.' },
        { id: 'effects', icon: Film, label: 'Effects' },
        { id: 'ai-tools', icon: Wand2, label: 'AI Tools' },
        { id: 'ai-sub', icon: Sparkles, label: 'Subs' },
        { id: 'bg-remove', icon: Eraser, label: 'No BG' },
      ]
    }
  ];

  return (
    <div 
      style={{ 
          left: position.x, 
          top: position.y,
          position: 'fixed'
      }}
      className={`z-40 transition-shadow duration-300 ${isDragging ? 'cursor-grabbing shadow-2xl' : 'cursor-default shadow-xl'}`}
    >
      <div className="backdrop-blur-xl bg-bg-secondary/95 border border-border/50 rounded-2xl overflow-hidden animate-in fade-in duration-300 flex flex-col w-[600px]">
        
        {/* Drag Handle */}
        <div 
          onMouseDown={handleMouseDown}
          className="h-6 bg-gradient-to-r from-bg-tertiary/80 via-bg-tertiary to-bg-tertiary/80 cursor-grab active:cursor-grabbing flex items-center justify-center group border-b border-border/30"
        >
           <div className="w-16 h-1 bg-border/50 rounded-full group-hover:bg-accent-primary/50 transition-colors" />
        </div>
        
        {/* Categorized Tools Panel */}
        <div className="p-4 grid grid-cols-4 gap-0 divide-x divide-border/20">
            {toolCategories.map((category) => (
                <div key={category.id} className="px-3 first:pl-0 last:pr-0 flex flex-col gap-2">
                    <span className="text-[10px] uppercase font-bold text-accent-primary tracking-wider mb-1 flex items-center gap-1.5 opacity-80">
                         {category.label}
                    </span>
                    <div className="grid grid-cols-3 gap-1.5">
                        {category.tools.map(tool => (
                            <button
                                key={tool.id}
                                onClick={() => onToolSelect(tool.id)}
                                className="aspect-square rounded-lg bg-bg-tertiary/50 hover:bg-accent-primary hover:text-white text-text-secondary flex flex-col items-center justify-center gap-0.5 transition-all group/btn relative"
                            >
                                <tool.icon className="w-4 h-4" />
                                <span className="text-[8px] opacity-0 group-hover/btn:opacity-100 absolute -bottom-4 bg-black/80 text-white px-1 rounded whitespace-nowrap pointer-events-none transition-opacity z-50">
                                    {tool.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};