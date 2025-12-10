import React from 'react';
import { Layers, MousePointer2 } from 'lucide-react';
import { Track } from '../../types';

export const Timeline: React.FC = () => {
  // Mock data for visual representation
  const tracks: Track[] = [
    { 
        id: 't1', name: 'Video 1', type: 'video', 
        clips: [{ id: 'c1', name: 'IMG_4901.MOV', start: 0, duration: 45, type: 'video', color: 'bg-blue-500' }] 
    },
    { 
        id: 't2', name: 'Video 2', type: 'video', 
        clips: [{ id: 'c2', name: 'B_ROLL_BEACH.MP4', start: 15, duration: 20, type: 'video', color: 'bg-indigo-500' }] 
    },
    { 
        id: 't3', name: 'Text', type: 'text', 
        clips: [{ id: 'c3', name: 'Title Overlay', start: 10, duration: 10, type: 'text', color: 'bg-purple-500' }] 
    },
    { 
        id: 't4', name: 'Audio 1', type: 'audio', 
        clips: [{ id: 'c4', name: 'Summer_Hit.mp3', start: 0, duration: 60, type: 'audio', color: 'bg-emerald-500' }] 
    },
  ];

  return (
    <div className="h-72 bg-bg-secondary border-t border-border/50 flex flex-col shrink-0 z-10">
        {/* Timeline Toolbar */}
        <div className="h-10 border-b border-border/50 flex items-center px-4 justify-between bg-bg-tertiary/30">
            <div className="flex items-center gap-4 text-xs text-text-secondary">
                <button className="flex items-center gap-1.5 hover:text-white">
                    <MousePointer2 size={14} />
                    <span>Select</span>
                </button>
                <div className="w-px h-4 bg-border/50" />
                <button className="hover:text-white">Split</button>
                <button className="hover:text-white">Snap</button>
            </div>
            
            <div className="flex items-center gap-2">
                 {/* Zoom Slider Mock */}
                 <span className="text-[10px] text-text-tertiary">-</span>
                 <div className="w-20 h-1 bg-bg-tertiary rounded-full">
                    <div className="w-1/2 h-full bg-text-secondary/50" />
                 </div>
                 <span className="text-[10px] text-text-tertiary">+</span>
            </div>
        </div>

        {/* Tracks Area */}
        <div className="flex-1 flex overflow-hidden">
            {/* Headers */}
            <div className="w-48 bg-bg-tertiary/10 border-r border-border/50 flex flex-col">
                {tracks.map(track => (
                    <div key={track.id} className="h-16 border-b border-border/50 flex items-center px-4 gap-3 group hover:bg-white/5 transition-colors cursor-pointer">
                         <div className="text-text-secondary">
                            <Layers size={14} />
                         </div>
                         <div className="flex-1 overflow-hidden">
                            <p className="text-xs font-medium text-text-primary truncate">{track.name}</p>
                            <p className="text-[10px] text-text-tertiary uppercase">{track.type}</p>
                         </div>
                    </div>
                ))}
            </div>

            {/* Ruler & Clips */}
            <div className="flex-1 flex flex-col relative overflow-x-auto overflow-y-hidden bg-bg-primary/50">
                {/* Playhead */}
                <div className="absolute top-0 bottom-0 left-[20%] w-px bg-accent-primary z-20 pointer-events-none">
                    <div className="absolute -top-1 -left-1.5 w-3 h-3 bg-accent-primary transform rotate-45" />
                </div>

                {/* Time Ruler */}
                <div className="h-6 border-b border-border/50 flex items-end text-[10px] text-text-tertiary relative bg-bg-secondary">
                     {[...Array(20)].map((_, i) => (
                         <div key={i} className="flex-1 border-l border-border/30 pl-1 h-2 flex items-end pb-1">
                            00:{i < 10 ? `0${i}` : i}
                         </div>
                     ))}
                </div>

                {/* Track Lanes */}
                <div className="flex-1 relative">
                    {/* Background Lines */}
                    {tracks.map((track, i) => (
                         <div key={track.id} className="h-16 border-b border-border/20 relative w-[200%]">
                             {/* Clips */}
                             {track.clips.map(clip => (
                                 <div 
                                    key={clip.id}
                                    className={`
                                        absolute top-2 bottom-2 rounded-lg ${clip.color} opacity-80 border border-white/20
                                        flex items-center px-3 overflow-hidden shadow-sm hover:opacity-100 cursor-move
                                    `}
                                    style={{ 
                                        left: `${clip.start * 10}px`, // Mock scaling
                                        width: `${clip.duration * 10}px`
                                    }}
                                 >
                                    <span className="text-[10px] font-medium text-white truncate drop-shadow-md">
                                        {clip.name}
                                    </span>
                                    
                                    {/* Waveform Visualization Mock for Audio */}
                                    {track.type === 'audio' && (
                                        <div className="absolute inset-0 opacity-30 flex items-center gap-0.5 px-1">
                                            {[...Array(40)].map((_, i) => (
                                                <div key={i} className="w-1 bg-black" style={{ height: `${Math.random() * 80 + 10}%` }} />
                                            ))}
                                        </div>
                                    )}
                                 </div>
                             ))}
                         </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};