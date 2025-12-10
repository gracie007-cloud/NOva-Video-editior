import React, { useState } from 'react';
import { 
  Download, ChevronDown, 
  Video, Camera, Music, Image as ImageIcon, Type, 
  Search, Plus, Folder, Sliders, Wand2, MonitorPlay
} from 'lucide-react';
import { Asset } from '../../types';

interface RightSidebarProps {
  assets: Asset[];
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ assets }) => {
  const [mediaTab, setMediaTab] = useState<'video' | 'camera' | 'audio' | 'image' | 'text'>('video');
  const [controlTab, setControlTab] = useState<'essentials' | 'adjust' | 'enhance'>('essentials');

  // Filter assets based on active media tab
  const filteredAssets = assets.filter(a => {
      if (mediaTab === 'video') return a.type === 'video';
      if (mediaTab === 'audio') return a.type === 'audio';
      if (mediaTab === 'image') return a.type === 'image';
      if (mediaTab === 'text') return a.type === 'text';
      return true;
  });

  return (
    <div className="w-80 bg-bg-secondary border-l border-border/50 flex flex-col z-20 h-full shadow-2xl overflow-hidden">
      
      {/* 1. EXPORT BUTTON (Fixed at Top, No shrinking) */}
      <div className="p-4 border-b border-border/50 bg-bg-secondary z-10 shrink-0">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-xl hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-sm font-bold shadow-lg">
          <Download size={18} />
          <span>Export Video</span>
        </button>
      </div>

      {/* MAIN CONTENT CONTAINER (Flex column to split space) */}
      <div className="flex-1 flex flex-col min-h-0">
          
          {/* 2. MEDIA LIBRARY SECTION (Top Half) */}
          <div className="flex-1 basis-1/2 flex flex-col min-h-0 border-b border-border/50 bg-bg-secondary overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/30 bg-bg-tertiary/5 shrink-0">
              <h3 className="font-semibold text-sm text-text-primary flex items-center gap-2">
                <Folder size={14} className="text-accent-primary" />
                Media Library
              </h3>
              <span className="text-[10px] text-text-tertiary font-mono bg-bg-tertiary/50 px-2 py-0.5 rounded-full border border-border/30">
                {assets.length} Items
              </span>
            </div>

            {/* Media Type Tabs */}
            <div className="flex items-center gap-1 p-2 border-b border-border/30 overflow-x-auto no-scrollbar shrink-0">
              {[
                { id: 'video', icon: '🎬', label: 'Video' },
                { id: 'camera', icon: '📹', label: 'Cam' },
                { id: 'audio', icon: '🎵', label: 'Audio' },
                { id: 'image', icon: '🖼️', label: 'Img' },
                { id: 'text', icon: '📝', label: 'Text' }
              ].map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setMediaTab(tab.id as any)}
                  className={`
                    flex-1 min-w-[40px] h-9 rounded-lg flex items-center justify-center text-base transition-all
                    ${mediaTab === tab.id 
                      ? 'bg-accent-primary/10 border border-accent-primary/50 shadow-[0_0_10px_rgba(99,102,241,0.1)] text-white' 
                      : 'hover:bg-bg-tertiary text-text-secondary hover:text-text-primary'
                    }
                  `}
                  title={tab.label}
                >
                  <span className="scale-90">{tab.icon}</span>
                </button>
              ))}
            </div>

            {/* Import Area */}
            <div className="p-3 shrink-0">
              <button className="w-full py-4 border-2 border-dashed border-border/40 rounded-xl hover:border-accent-primary hover:bg-accent-primary/5 flex flex-col items-center justify-center gap-1.5 transition-all group bg-bg-tertiary/5">
                <div className="flex items-center gap-2 text-text-primary group-hover:text-accent-primary transition-colors">
                    <Plus size={16} />
                    <span className="text-sm font-semibold">Import Media</span>
                </div>
                <span className="text-[10px] text-text-tertiary">Drag & drop or click to upload</span>
              </button>
            </div>

            {/* Thumbnails Grid (Scrollable) */}
            <div className="flex-1 overflow-y-auto px-3 pb-2 custom-scrollbar">
              <div className="grid grid-cols-2 gap-2">
                {filteredAssets.length > 0 ? (
                    filteredAssets.map((asset) => (
                    <div key={asset.id} className="relative aspect-video bg-bg-tertiary rounded-lg overflow-hidden group cursor-pointer border border-border/30 hover:border-accent-primary/50 transition-all hover:shadow-md">
                        {asset.src ? (
                            <img src={asset.src} alt={asset.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center p-2 bg-bg-tertiary/50 gap-2">
                                {asset.type === 'audio' && <Music className="text-text-secondary" size={20} />}
                                {asset.type === 'text' && <Type className="text-text-secondary" size={20} />}
                                {asset.type === 'folder' && <Folder className="text-text-secondary" size={20} />}
                                <span className="text-[9px] text-text-secondary text-center line-clamp-1 break-all px-1">{asset.name}</span>
                            </div>
                        )}
                        
                        {/* Duration/Count Badge */}
                        {(asset.duration || asset.itemCount) && (
                            <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 rounded text-[9px] font-mono text-white/90 backdrop-blur-[2px]">
                                {asset.duration || `${asset.itemCount} items`}
                            </div>
                        )}

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            {asset.type !== 'folder' && (
                                <Plus className="text-white drop-shadow-md" size={20} />
                            )}
                        </div>
                    </div>
                    ))
                ) : (
                    <div className="col-span-2 text-center py-8 text-text-tertiary text-xs flex flex-col items-center gap-2">
                        <Search size={24} className="opacity-20" />
                        No media found
                    </div>
                )}
                
                {/* Folder Mock (Only on video tab for demo) */}
                {mediaTab === 'video' && (
                    <div className="relative aspect-video bg-bg-tertiary/40 rounded-lg p-3 flex flex-col items-center justify-center group cursor-pointer border border-border/30 hover:border-accent-primary/50 transition-all border-dashed">
                        <Folder size={24} className="text-accent-secondary mb-1 opacity-80 group-hover:opacity-100 transition-opacity" />
                        <p className="text-[10px] font-medium text-text-primary text-center">Project Files</p>
                        <p className="text-[9px] text-text-tertiary">3 items</p>
                    </div>
                )}
              </div>
            </div>

            {/* Zoom Slider */}
            <div className="flex items-center gap-3 px-4 py-2 border-t border-border/30 bg-bg-tertiary/5 shrink-0">
              <span className="text-[10px] text-text-tertiary font-medium">−</span>
              <input 
                type="range" 
                min="0" 
                max="100" 
                defaultValue="50"
                className="flex-1 h-1 bg-bg-tertiary rounded-lg appearance-none cursor-pointer accent-accent-primary"
              />
              <span className="text-[10px] text-text-tertiary font-medium">+</span>
            </div>
          </div>

          {/* 3. CONTROLS PANEL SECTION (Bottom Half) */}
          <div className="flex-1 basis-1/2 flex flex-col min-h-0 bg-bg-secondary">
            {/* Tabs */}
            <div className="flex border-b border-border/50 bg-bg-secondary shrink-0">
              {[
                  { id: 'essentials', label: 'Essentials' },
                  { id: 'adjust', label: 'Adjust' },
                  { id: 'enhance', label: 'Enhance' }
              ].map(tab => (
                <button 
                    key={tab.id}
                    onClick={() => setControlTab(tab.id as any)}
                    className={`
                        flex-1 py-3 text-xs font-semibold tracking-wide transition-all relative
                        ${controlTab === tab.id 
                            ? 'text-accent-primary' 
                            : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary/30'
                        }
                    `}
                >
                    {tab.label}
                    {controlTab === tab.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-primary shadow-[0_-2px_6px_rgba(99,102,241,0.4)]" />
                    )}
                </button>
              ))}
            </div>

            {/* Controls Content - SCROLLABLE */}
            <div key={controlTab} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar animate-in fade-in duration-200">
              
              {controlTab === 'essentials' && (
                  <>
                    {/* TRANSFORM */}
                    <Collapsible title="TRANSFORM" icon="🔄" defaultOpen>
                        <SliderControl label="Scale" value={120} unit="%" />
                        <SliderControl label="Opacity" value={100} unit="%" />
                        <SliderControl label="Position X" value={0} />
                        <SliderControl label="Rotation" value={0} unit="°" />
                    </Collapsible>

                    {/* AUDIO */}
                    <Collapsible title="AUDIO" icon="🔊">
                        <SliderControl label="Volume" value={80} unit="%" />
                    </Collapsible>

                    {/* TRANSITIONS */}
                    <Collapsible title="TRANSITIONS" icon="🎞️">
                        <DropdownControl label="In Animation" options={['None', 'Fade In', 'Slide Left', 'Zoom In']} />
                        <DropdownControl label="Out Animation" options={['None', 'Fade Out', 'Slide Right', 'Zoom Out']} />
                    </Collapsible>

                    {/* AI MAGIC */}
                    <Collapsible title="AI MAGIC" icon="✨" defaultOpen>
                        <div className="space-y-2 pt-1">
                        <AIButton icon="🔇" label="Remove Silence" />
                        <AIButton icon="💬" label="Generate Subtitles" />
                        <AIButton icon="🎤" label="Enhance Audio" />
                        <AIButton icon="🗣️" label="Voice Cloning" />
                        <AIButton icon="🖼️" label="Remove Background" />
                        <AIButton icon="🎬" label="Auto-Edit" />
                        <AIButton icon="📱" label="Smart Crop" />
                        </div>
                    </Collapsible>
                  </>
              )}

              {controlTab === 'adjust' && (
                  <>
                    <Collapsible title="COLOR CORRECTION" icon="🎨" defaultOpen>
                        <SliderControl label="Brightness" value={0} min={-100} max={100} />
                        <SliderControl label="Contrast" value={10} min={-100} max={100} />
                        <SliderControl label="Saturation" value={20} min={-100} max={100} />
                        <SliderControl label="Temperature" value={0} min={-100} max={100} />
                    </Collapsible>
                    <Collapsible title="SPEED" icon="⚡" defaultOpen>
                        <SliderControl label="Speed" value={1} unit="x" min={0.1} max={5} />
                        <div className="flex items-center gap-2 mt-2">
                            <input type="checkbox" id="pitch" className="rounded bg-bg-tertiary border-border/50 text-accent-primary focus:ring-accent-primary" />
                            <label htmlFor="pitch" className="text-xs text-text-secondary">Preserve Pitch</label>
                        </div>
                    </Collapsible>
                  </>
              )}

              {controlTab === 'enhance' && (
                  <>
                    <Collapsible title="FILTERS" icon="🎭" defaultOpen>
                        <div className="grid grid-cols-3 gap-2">
                            {['Vivid', 'Mono', 'Vintage', 'Cyber', 'Warm', 'Cold'].map(f => (
                                <button key={f} className="aspect-square rounded bg-bg-tertiary border border-border/30 hover:border-accent-primary hover:text-accent-primary text-[10px] flex items-center justify-center transition-all">
                                    {f}
                                </button>
                            ))}
                        </div>
                    </Collapsible>
                    <Collapsible title="EFFECTS" icon="🪄" defaultOpen>
                        <div className="space-y-2">
                            <AIButton icon="🌫️" label="Add Blur" />
                            <AIButton icon="📺" label="Glitch Effect" />
                            <AIButton icon="💫" label="Particles" />
                        </div>
                    </Collapsible>
                  </>
              )}

            </div>
          </div>
      </div>
    </div>
  );
};

/* --- Helper Components --- */

const Collapsible: React.FC<{ title: string; icon: string; defaultOpen?: boolean; children: React.ReactNode }> = ({ title, icon, defaultOpen = false, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border border-border/50 rounded-xl overflow-hidden bg-bg-tertiary/5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-bg-tertiary/20 to-transparent hover:from-bg-tertiary/40 transition-all group"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-base filter drop-shadow-sm">{icon}</span>
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider group-hover:text-text-primary transition-colors">{title}</span>
        </div>
        <ChevronDown size={14} className={`text-text-tertiary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="p-4 space-y-4 border-t border-border/30 bg-black/10 animate-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  );
};

const SliderControl: React.FC<{ label: string; value: number; unit?: string; min?: number; max?: number }> = ({ label, value, unit = '', min = 0, max = 200 }) => (
  <div className="space-y-2 group">
    <div className="flex items-center justify-between">
      <span className="text-xs text-text-secondary group-hover:text-text-primary transition-colors">{label}</span>
      <span className="text-[10px] font-mono text-text-primary bg-bg-tertiary px-1.5 py-0.5 rounded border border-border/30 min-w-[32px] text-center">{value}{unit}</span>
    </div>
    <div className="relative h-1.5 w-full py-2 cursor-pointer">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-bg-tertiary rounded-full overflow-hidden">
             <div className="h-full bg-accent-primary rounded-full transition-all duration-75" style={{ width: `${((value - min) / (max - min)) * 100}%` }}></div>
        </div>
        <input
            type="range"
            min={min}
            max={max}
            defaultValue={value}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div 
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md pointer-events-none transition-all duration-75 group-hover:scale-110" 
            style={{ left: `${((value - min) / (max - min)) * 100}%`, transform: 'translateX(-50%) translateY(-50%)' }}
        ></div>
    </div>
  </div>
);

const DropdownControl: React.FC<{ label: string; options: string[] }> = ({ label, options }) => (
  <div className="space-y-1.5">
    <label className="text-xs text-text-secondary">{label}</label>
    <div className="relative">
      <select className="w-full bg-bg-primary border border-border/50 rounded-lg px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 appearance-none cursor-pointer hover:border-border transition-all">
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-tertiary" />
    </div>
  </div>
);

const AIButton: React.FC<{ icon: string; label: string }> = ({ icon, label }) => (
  <button className="w-full py-2.5 bg-bg-tertiary/30 hover:bg-gradient-to-r hover:from-accent-primary/20 hover:to-accent-secondary/20 border border-transparent hover:border-accent-primary/30 rounded-lg text-xs font-medium text-text-secondary hover:text-text-primary flex items-center gap-3 px-3 transition-all group active:scale-[0.99]">
    <span className="text-sm group-hover:scale-110 transition-transform filter drop-shadow-sm">{icon}</span>
    <span>{label}</span>
    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-accent-primary">Use</span>
  </button>
);