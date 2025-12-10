import React from 'react';
import { Play, SkipBack, SkipForward, Maximize, Volume2 } from 'lucide-react';

export const PreviewCanvas: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-bg-primary p-6 gap-6 overflow-hidden">
        {/* Canvas Container */}
        <div className="flex-1 flex items-center justify-center bg-bg-secondary/30 rounded-3xl border border-border/30 relative group overflow-hidden shadow-inner">
            
            {/* Grid/Placeholder Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                 <div className="w-[80%] aspect-video border-2 border-dashed border-text-tertiary rounded-xl flex items-center justify-center">
                    <p className="text-text-tertiary font-medium tracking-wider">1920 x 1080 PREVIEW</p>
                 </div>
            </div>

            {/* Simulated Video Content */}
            <div className="relative w-[70%] aspect-video bg-black rounded-lg shadow-2xl overflow-hidden ring-1 ring-white/10">
                <img 
                    src="https://picsum.photos/1920/1080" 
                    alt="Preview" 
                    className="w-full h-full object-cover opacity-80"
                />
                
                {/* Overlay Text Element Example */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-4xl drop-shadow-lg tracking-widest uppercase">
                    Summer Vibes
                </div>
            </div>

            {/* Timecode Overlay */}
            <div className="absolute bottom-6 font-mono text-accent-primary bg-black/50 backdrop-blur px-3 py-1 rounded-lg border border-white/10">
                00:00:14:05
            </div>
        </div>

        {/* Playback Controls */}
        <div className="h-16 bg-bg-secondary/50 backdrop-blur-md rounded-2xl border border-border/50 flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-4 text-text-secondary">
                 <span className="text-xs font-mono">00:00</span>
            </div>

            <div className="flex items-center gap-6">
                <button className="text-text-secondary hover:text-white transition-colors">
                    <SkipBack size={20} className="fill-current" />
                </button>
                
                <button className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-glow">
                    <Play size={20} className="fill-current ml-1" />
                </button>

                <button className="text-text-secondary hover:text-white transition-colors">
                    <SkipForward size={20} className="fill-current" />
                </button>
            </div>

            <div className="flex items-center gap-4 text-text-secondary">
                <div className="flex items-center gap-2 group cursor-pointer">
                    <Volume2 size={18} />
                    <div className="w-20 h-1 bg-bg-tertiary rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-white group-hover:bg-accent-primary transition-colors" />
                    </div>
                </div>
                <button className="hover:text-white transition-colors">
                    <Maximize size={18} />
                </button>
            </div>
        </div>
    </div>
  );
};