import React, { useState } from 'react';
import { 
    Scissors, Type, Music, Film, Zap, Sparkles, Eraser, Palette, 
    Crop, RotateCw, Volume2, X 
} from 'lucide-react';
import { Tool } from '../../types';

interface CustomizeToolbarModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentToolIds: string[];
    onSave: (toolIds: string[]) => void;
}

const ALL_TOOLS = [
    { id: 'cut', icon: Scissors, label: 'Cut' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'audio', icon: Music, label: 'Audio' },
    { id: 'transitions', icon: Film, label: 'Transition' },
    { id: 'speed', icon: Zap, label: 'Speed' },
    { id: 'ai', icon: Sparkles, label: 'AI Subtitle' },
    { id: 'bg-remove', icon: Eraser, label: 'Remove BG' },
    { id: 'color-grade', icon: Palette, label: 'Color Grade' },
    { id: 'crop', icon: Crop, label: 'Crop' },
    { id: 'rotate', icon: RotateCw, label: 'Rotate' },
    { id: 'volume', icon: Volume2, label: 'Volume' },
    { id: 'split', icon: Scissors, label: 'Split' },
];

export const CustomizeToolbarModal: React.FC<CustomizeToolbarModalProps> = ({ isOpen, onClose, currentToolIds, onSave }) => {
    const [selectedTools, setSelectedTools] = useState<string[]>(currentToolIds);

    if (!isOpen) return null;

    const handleAdd = (id: string) => {
        if (selectedTools.length < 12) {
            setSelectedTools(prev => [...prev, id]);
        }
    };

    const handleRemove = (id: string) => {
        setSelectedTools(prev => prev.filter(t => t !== id));
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] animate-in fade-in duration-200">
            <div className="bg-bg-secondary border border-border rounded-2xl w-[700px] max-h-[85vh] overflow-hidden shadow-2xl flex flex-col">
                <div className="p-6 border-b border-border/50">
                    <h2 className="text-xl font-semibold text-text-primary">Customize Floating Toolbar</h2>
                    <p className="text-sm text-text-secondary mt-1">
                        Drag tools to add/remove. Max 12 tools.
                    </p>
                </div>

                <div className="p-6 space-y-6 overflow-y-auto flex-1">
                    {/* Current Selected Tools */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-sm font-medium text-text-primary">Current Tools ({selectedTools.length}/12)</h3>
                            <button 
                                onClick={() => setSelectedTools(['cut', 'text', 'audio', 'transitions', 'speed', 'ai'])}
                                className="text-xs text-accent-primary hover:underline"
                            >
                                Reset Default
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-3 p-4 bg-bg-tertiary/30 border border-border/30 rounded-xl min-h-[100px]">
                            {selectedTools.map(toolId => {
                                const tool = ALL_TOOLS.find(t => t.id === toolId);
                                if (!tool) return null;
                                const Icon = tool.icon;
                                return (
                                    <div
                                        key={toolId}
                                        className="relative w-16 h-16 rounded-xl bg-bg-secondary border border-border flex flex-col items-center justify-center gap-1 group hover:border-accent-primary transition-all shadow-sm"
                                    >
                                        <Icon className="w-5 h-5 text-text-primary" />
                                        <span className="text-[10px] text-text-secondary">{tool.label}</span>
                                        <button
                                            onClick={() => handleRemove(toolId)}
                                            className="absolute -top-2 -right-2 w-5 h-5 bg-error rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 shadow-md"
                                        >
                                            <X className="w-3 h-3 text-white" />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Available Tools */}
                    <div>
                        <h3 className="text-sm font-medium mb-3 text-text-primary">Available Tools</h3>
                        <div className="flex flex-wrap gap-3 p-4 bg-bg-tertiary/30 border border-border/30 rounded-xl">
                            {ALL_TOOLS
                                .filter(tool => !selectedTools.includes(tool.id))
                                .map(tool => {
                                    const Icon = tool.icon;
                                    return (
                                        <button
                                            key={tool.id}
                                            onClick={() => handleAdd(tool.id)}
                                            disabled={selectedTools.length >= 12}
                                            className="w-16 h-16 rounded-xl bg-bg-secondary border border-border hover:border-accent-primary flex flex-col items-center justify-center gap-1 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Icon className="w-5 h-5 text-text-primary" />
                                            <span className="text-[10px] text-text-secondary">{tool.label}</span>
                                        </button>
                                    );
                                })}
                            {ALL_TOOLS.filter(t => !selectedTools.includes(t.id)).length === 0 && (
                                <p className="text-sm text-text-secondary w-full text-center py-4">All tools selected!</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 p-6 border-t border-border/50 bg-bg-tertiary/20">
                    <button onClick={onClose} className="px-4 py-2 rounded-lg hover:bg-bg-tertiary text-text-secondary hover:text-text-primary transition-all text-sm">
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave(selectedTools)}
                        className="px-6 py-2 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-lg hover:shadow-glow transition-all text-sm font-medium"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};