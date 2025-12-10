import React, { useState } from 'react';
import { 
  X, Monitor, Zap, LayoutTemplate, Film, Cpu, Keyboard, Shield, Code, 
  Save, Wand2, Globe, HardDrive, AlertTriangle, RefreshCw
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SettingsTab = 'general' | 'performance' | 'project' | 'timeline' | 'export' | 'ai' | 'shortcuts' | 'privacy' | 'advanced';

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');

  if (!isOpen) return null;

  const tabs: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
    { id: 'general', label: 'General', icon: Monitor },
    { id: 'performance', label: 'Performance', icon: Zap },
    { id: 'project', label: 'Project Defaults', icon: LayoutTemplate },
    { id: 'timeline', label: 'Timeline', icon: Film },
    { id: 'export', label: 'Export', icon: Save },
    { id: 'ai', label: 'AI Tools', icon: Wand2 },
    { id: 'shortcuts', label: 'Shortcuts', icon: Keyboard },
    { id: 'privacy', label: 'Privacy & Data', icon: Shield },
    { id: 'advanced', label: 'Advanced', icon: Code },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] animate-in fade-in duration-200">
      <div className="bg-bg-secondary w-[950px] h-[750px] rounded-2xl border border-border/50 shadow-2xl flex overflow-hidden">
        
        {/* Sidebar */}
        <div className="w-64 bg-bg-tertiary/30 border-r border-border/50 flex flex-col">
          <div className="p-6 border-b border-border/50">
            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
              <SettingsIcon /> Settings
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium text-left
                  ${activeTab === tab.id 
                    ? 'bg-accent-primary text-white shadow-lg' 
                    : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
                  }
                `}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
          <div className="p-4 border-t border-border/50 text-xs text-text-tertiary text-center">
            Version 2.4.0 (Pro)
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col bg-bg-secondary relative min-w-0">
          {/* Header */}
          <div className="h-20 border-b border-border/50 flex items-center justify-between px-8 bg-bg-secondary/50 backdrop-blur-md">
            <div>
              <h3 className="text-lg font-semibold text-text-primary">
                {tabs.find(t => t.id === activeTab)?.label}
              </h3>
              <p className="text-xs text-text-secondary mt-0.5">Manage your editor preferences</p>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-bg-tertiary hover:bg-error/20 hover:text-error flex items-center justify-center transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Scrollable Form */}
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {activeTab === 'general' && <GeneralSettings />}
            {activeTab === 'performance' && <PerformanceSettings />}
            {activeTab === 'project' && <ProjectDefaults />}
            {activeTab === 'timeline' && <TimelineSettings />}
            {activeTab === 'export' && <ExportSettings />}
            {activeTab === 'ai' && <AISettings />}
            {activeTab === 'shortcuts' && <ShortcutsSettings />}
            {activeTab === 'privacy' && <PrivacySettings />}
            {activeTab === 'advanced' && <AdvancedSettings />}
          </div>

          {/* Footer */}
          <div className="h-20 border-t border-border/50 flex items-center justify-between px-8 gap-4 bg-bg-secondary shrink-0">
             <button className="text-sm text-error hover:underline opacity-80 hover:opacity-100">
               Reset to Defaults
             </button>
             <div className="flex gap-3">
              <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-text-secondary hover:bg-bg-tertiary transition-colors font-medium text-sm">
                Cancel
              </button>
              <button 
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-medium hover:shadow-glow hover:scale-105 transition-all text-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- Sub Components --- */

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
)

const SettingSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-10 last:mb-0">
    <h4 className="text-sm font-semibold text-accent-primary uppercase tracking-wider mb-5 border-b border-border/30 pb-2">{title}</h4>
    <div className="space-y-4">{children}</div>
  </div>
);

const SettingRow: React.FC<{ label: string; description?: string; children: React.ReactNode }> = ({ label, description, children }) => (
  <div className="flex items-center justify-between p-4 rounded-xl bg-bg-tertiary/10 border border-border/30 hover:bg-bg-tertiary/30 transition-colors">
    <div className="max-w-[60%]">
      <p className="text-sm font-medium text-text-primary">{label}</p>
      {description && <p className="text-xs text-text-secondary mt-1 leading-relaxed">{description}</p>}
    </div>
    <div className="flex-shrink-0 ml-4">{children}</div>
  </div>
);

const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
  <div className="relative">
    <select {...props} className="appearance-none bg-bg-tertiary border border-border/50 text-text-primary text-sm rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all cursor-pointer min-w-[140px]">
      {props.children}
    </select>
    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary">▼</div>
  </div>
);

const Toggle: React.FC<{ checked?: boolean }> = ({ checked = false }) => (
  <div className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer ${checked ? 'bg-accent-primary' : 'bg-bg-tertiary border border-border'}`}>
    <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
  </div>
);

/* --- Specific Settings Forms --- */

const GeneralSettings = () => (
  <>
    <SettingSection title="Interface">
      <SettingRow label="Theme" description="Choose your preferred visual style">
        <Select defaultValue="dark">
          <option value="dark">Dark Mode</option>
          <option value="light">Light Mode</option>
          <option value="auto">System Auto</option>
        </Select>
      </SettingRow>
      <SettingRow label="Language" description="Select UI language">
        <Select defaultValue="en">
          <option value="en">English</option>
          <option value="bn">Bangla</option>
        </Select>
      </SettingRow>
    </SettingSection>
    <SettingSection title="Backup & Auto-Save">
      <SettingRow label="Auto-save Project" description="Automatically save changes while you work">
        <Toggle checked />
      </SettingRow>
      <SettingRow label="Auto-save Interval" description="Frequency of auto-saves">
        <Select defaultValue="60">
          <option value="30">Every 30s</option>
          <option value="60">Every 60s</option>
          <option value="120">Every 2m</option>
          <option value="300">Every 5m</option>
        </Select>
      </SettingRow>
      <SettingRow label="Max Backups" description="Number of backup versions to keep">
        <Select defaultValue="10">
          <option value="5">5 Versions</option>
          <option value="10">10 Versions</option>
          <option value="20">20 Versions</option>
        </Select>
      </SettingRow>
    </SettingSection>
  </>
);

const PerformanceSettings = () => (
  <>
    <SettingSection title="Playback & Rendering">
      <SettingRow label="Preview Quality" description="Lower quality improves performance on weaker hardware">
        <Select defaultValue="720">
          <option value="360">Low (360p)</option>
          <option value="720">Medium (720p)</option>
          <option value="1080">High (1080p)</option>
          <option value="native">Full (Native)</option>
        </Select>
      </SettingRow>
      <SettingRow label="Hardware Acceleration" description="Use GPU for video decoding/encoding">
        <Toggle checked />
      </SettingRow>
      <SettingRow label="Frame Skipping" description="Drop frames to maintain sync on slow devices">
        <Toggle checked />
      </SettingRow>
    </SettingSection>
    <SettingSection title="Resource Management">
      <SettingRow label="Memory Limit" description="Max RAM usage for the editor (prevents crashes)">
        <Select defaultValue="4gb">
          <option value="1gb">1 GB</option>
          <option value="2gb">2 GB</option>
          <option value="4gb">4 GB</option>
          <option value="8gb">8 GB</option>
          <option value="unlimited">Unlimited</option>
        </Select>
      </SettingRow>
      <SettingRow label="Background Rendering" description="Process videos while you do other tasks">
        <Toggle checked={false} />
      </SettingRow>
      <SettingRow label="Cache Size" description="Disk space for temporary files">
        <Select defaultValue="2gb">
          <option value="500mb">500 MB</option>
          <option value="1gb">1 GB</option>
          <option value="2gb">2 GB</option>
          <option value="5gb">5 GB</option>
        </Select>
      </SettingRow>
      <SettingRow label="Clear Cache on Exit" description="Free up disk space when closing app">
        <Toggle checked={false} />
      </SettingRow>
    </SettingSection>
  </>
);

const ProjectDefaults = () => (
    <>
    <SettingSection title="Default Settings">
        <SettingRow label="Default Resolution" description="Canvas size for new projects">
             <Select defaultValue="1080p">
                 <option value="720p">720p (HD)</option>
                 <option value="1080p">1080p (FHD)</option>
                 <option value="4k">4K (UHD)</option>
             </Select>
        </SettingRow>
        <SettingRow label="Default FPS" description="Frame rate for new projects">
             <Select defaultValue="30">
                 <option value="24">24 FPS</option>
                 <option value="30">30 FPS</option>
                 <option value="60">60 FPS</option>
             </Select>
        </SettingRow>
        <SettingRow label="Image Clip Duration" description="Default duration for images added to timeline (sec)">
             <input type="number" defaultValue={5} className="w-20 bg-bg-tertiary border border-border/50 rounded-lg px-3 py-2 text-sm text-center focus:border-accent-primary outline-none" />
        </SettingRow>
        <SettingRow label="Transition Duration" description="Default length for transitions (sec)">
             <Select defaultValue="0.5">
                 <option value="0.5">0.5s</option>
                 <option value="1">1.0s</option>
                 <option value="2">2.0s</option>
             </Select>
        </SettingRow>
    </SettingSection>
    <SettingSection title="Audio Defaults">
        <SettingRow label="Default Fade In" description="Auto apply fade in to new audio clips">
             <Select defaultValue="0">
                 <option value="0">None</option>
                 <option value="0.5">0.5s</option>
                 <option value="1">1.0s</option>
             </Select>
        </SettingRow>
        <SettingRow label="Default Fade Out" description="Auto apply fade out to new audio clips">
             <Select defaultValue="0">
                 <option value="0">None</option>
                 <option value="0.5">0.5s</option>
                 <option value="1">1.0s</option>
             </Select>
        </SettingRow>
    </SettingSection>
    </>
);

const TimelineSettings = () => (
    <>
    <SettingSection title="Navigation">
         <SettingRow label="Default Zoom Level" description="Initial time per unit on timeline">
             <Select defaultValue="5">
                 <option value="1">1 second</option>
                 <option value="2">2 seconds</option>
                 <option value="5">5 seconds</option>
                 <option value="10">10 seconds</option>
             </Select>
         </SettingRow>
    </SettingSection>
    <SettingSection title="Snapping & Alignment">
         <SettingRow label="Snap to Grid" description="Align clips to the time grid">
            <Toggle checked />
         </SettingRow>
         <SettingRow label="Snap Sensitivity" description="Distance to trigger snap">
            <Select defaultValue="medium">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </Select>
         </SettingRow>
         <SettingRow label="Magnetic Snap" description="Clips automatically attach to adjacent clips">
            <Toggle checked />
         </SettingRow>
    </SettingSection>
    <SettingSection title="Visuals">
         <SettingRow label="Show Audio Waveforms" description="Display audio levels on timeline">
             <Toggle checked />
         </SettingRow>
         <SettingRow label="Show Video Thumbnails" description="Display frames on video clips">
             <Toggle checked />
         </SettingRow>
         <SettingRow label="Thumbnail Quality" description="Resolution of timeline thumbnails">
             <Select defaultValue="low">
                 <option value="low">Low (Fast)</option>
                 <option value="medium">Medium</option>
                 <option value="high">High</option>
             </Select>
         </SettingRow>
         <SettingRow label="Track Height" description="Vertical size of timeline tracks">
             <Select defaultValue="normal">
                 <option value="compact">Compact</option>
                 <option value="normal">Normal</option>
                 <option value="large">Large</option>
             </Select>
         </SettingRow>
    </SettingSection>
    </>
);

const ExportSettings = () => (
    <>
    <SettingSection title="Video Output">
         <SettingRow label="Default Format" description="Preferred container format">
             <Select defaultValue="mp4">
                 <option value="mp4">MP4 (H.264)</option>
                 <option value="mov">MOV (ProRes)</option>
                 <option value="webm">WebM (VP9)</option>
             </Select>
         </SettingRow>
         <SettingRow label="Default Codec" description="Compression standard">
             <Select defaultValue="h264">
                 <option value="h264">H.264 (Standard)</option>
                 <option value="h265">H.265 (High Efficiency)</option>
                 <option value="vp9">VP9 (Open Source)</option>
             </Select>
         </SettingRow>
         <SettingRow label="Default Quality" description="CRF value (Lower is better quality)">
             <Select defaultValue="medium">
                 <option value="high">High (CRF 18)</option>
                 <option value="medium">Medium (CRF 23)</option>
                 <option value="low">Low (CRF 28)</option>
             </Select>
         </SettingRow>
    </SettingSection>
    <SettingSection title="Audio Output">
         <SettingRow label="Audio Codec" description="Audio compression format">
             <Select defaultValue="aac">
                 <option value="aac">AAC</option>
                 <option value="mp3">MP3</option>
                 <option value="opus">Opus</option>
             </Select>
         </SettingRow>
         <SettingRow label="Audio Bitrate" description="Audio quality (kbps)">
             <Select defaultValue="192">
                 <option value="128">128 kbps</option>
                 <option value="192">192 kbps</option>
                 <option value="256">256 kbps</option>
                 <option value="320">320 kbps</option>
             </Select>
         </SettingRow>
    </SettingSection>
    <SettingSection title="Post-Export">
         <SettingRow label="Export Location" description="Where to save files">
             <Select defaultValue="downloads">
                 <option value="downloads">Downloads Folder</option>
                 <option value="desktop">Desktop</option>
                 <option value="custom">Ask every time</option>
             </Select>
         </SettingRow>
         <SettingRow label="Auto-open" description="Open file after export completes">
             <Toggle checked />
         </SettingRow>
    </SettingSection>
    </>
);

const AISettings = () => (
  <>
    <SettingSection title="Subtitles">
      <SettingRow label="Subtitle Provider" description="Engine used for generation">
        <Select defaultValue="gemini">
          <option value="gemini">Gemini (Best Quality)</option>
          <option value="assembly">AssemblyAI (Fast)</option>
          <option value="browser">Web Speech (Offline)</option>
        </Select>
      </SettingRow>
      <SettingRow label="Subtitle Language" description="Target language for captions">
        <Select defaultValue="en">
          <option value="en">English</option>
          <option value="bn">Bangla</option>
          <option value="bng">Banglish</option>
        </Select>
      </SettingRow>
      <SettingRow label="Default Style" description="Look and feel of captions">
        <Select defaultValue="netflix">
            <option value="netflix">Netflix Standard</option>
            <option value="youtube">YouTube Default</option>
            <option value="tiktok">TikTok Bold</option>
            <option value="custom">Custom</option>
        </Select>
      </SettingRow>
    </SettingSection>
    <SettingSection title="Visual Processing">
      <SettingRow label="BG Removal Quality" description="Precision vs Speed">
        <Select defaultValue="balanced">
          <option value="fast">Fast</option>
          <option value="balanced">Balanced</option>
          <option value="quality">High Quality</option>
        </Select>
      </SettingRow>
      <SettingRow label="Voice Generation" description="TTS Provider">
         <Select defaultValue="elevenlabs">
             <option value="elevenlabs">ElevenLabs (Premium)</option>
             <option value="browser">Browser Native (Free)</option>
         </Select>
      </SettingRow>
    </SettingSection>
  </>
);

const ShortcutsSettings = () => (
    <>
    <SettingSection title="Playback Controls">
        <ShortcutRow action="Play / Pause" keys={['Space']} />
        <ShortcutRow action="Stop" keys={['K']} />
        <ShortcutRow action="Frame Forward" keys={['Right']} />
        <ShortcutRow action="Frame Backward" keys={['Left']} />
    </SettingSection>
    <SettingSection title="Editing Tools">
        <ShortcutRow action="Cut / Split" keys={['C', 'S']} />
        <ShortcutRow action="Delete" keys={['Del', 'Backspace']} />
        <ShortcutRow action="Undo" keys={['Ctrl', 'Z']} />
        <ShortcutRow action="Redo" keys={['Ctrl', 'Shift', 'Z']} />
        <ShortcutRow action="Select Tool" keys={['V']} />
        <ShortcutRow action="Text Tool" keys={['T']} />
    </SettingSection>
    <SettingSection title="Timeline View">
        <ShortcutRow action="Zoom In" keys={['Ctrl', '+']} />
        <ShortcutRow action="Zoom Out" keys={['Ctrl', '-']} />
        <ShortcutRow action="Fit to Screen" keys={['Shift', 'Z']} />
    </SettingSection>
    <div className="flex justify-end pt-4">
        <button className="text-sm text-accent-primary hover:underline flex items-center gap-2">
            Allow Custom Shortcuts <Toggle checked />
        </button>
    </div>
    </>
);

const ShortcutRow: React.FC<{ action: string; keys: string[] }> = ({ action, keys }) => (
    <div className="flex items-center justify-between py-2 border-b border-border/10 last:border-0">
        <span className="text-sm text-text-primary">{action}</span>
        <div className="flex gap-1">
            {keys.map((k, i) => (
                <kbd key={i} className="px-2 py-1 bg-bg-primary border border-border/50 rounded text-xs text-text-secondary font-mono min-w-[24px] text-center">
                    {k}
                </kbd>
            ))}
        </div>
    </div>
)

const PrivacySettings = () => (
    <>
    <SettingSection title="Data Collection">
         <SettingRow label="Send Usage Data" description="Help us improve by sending anonymous usage stats">
             <Toggle checked={false} />
         </SettingRow>
         <SettingRow label="Crash Reports" description="Automatically send reports when the app crashes">
             <Toggle checked />
         </SettingRow>
    </SettingSection>
    <SettingSection title="Cloud & Sync">
         <SettingRow label="Cloud Sync" description="Sync project metadata across devices">
             <Toggle checked={false} />
         </SettingRow>
    </SettingSection>
    <SettingSection title="History">
         <SettingRow label="Clear Export History" description="Remove record of past exports">
             <button className="px-3 py-1.5 bg-bg-tertiary hover:bg-error/10 hover:text-error border border-border/50 rounded text-xs transition-colors">
                 Clear Now
             </button>
         </SettingRow>
         <SettingRow label="Clear Recent Projects" description="Remove recent projects from list">
             <button className="px-3 py-1.5 bg-bg-tertiary hover:bg-error/10 hover:text-error border border-border/50 rounded text-xs transition-colors">
                 Clear Now
             </button>
         </SettingRow>
    </SettingSection>
    </>
);

const AdvancedSettings = () => (
    <>
    <SettingSection title="Developer Tools">
         <SettingRow label="Developer Mode" description="Show frame counters, render times, and logs">
             <Toggle checked={false} />
         </SettingRow>
         <SettingRow label="Experimental Features" description="Enable beta features (may be unstable)">
             <Toggle checked={false} />
         </SettingRow>
    </SettingSection>
    <SettingSection title="FFmpeg Engine">
         <div className="mb-4">
            <label className="block text-sm font-medium text-text-primary mb-2">Custom FFmpeg Flags</label>
            <input type="text" placeholder="-preset ultrafast -tune zerolatency" className="w-full bg-bg-tertiary border border-border/50 rounded-lg px-4 py-2 text-sm focus:border-accent-primary outline-none" />
         </div>
    </SettingSection>
    <SettingSection title="Network">
         <SettingRow label="Use Proxy" description="Route traffic through a proxy server">
             <Toggle checked={false} />
         </SettingRow>
         <div className="opacity-50 pointer-events-none">
            <label className="block text-sm font-medium text-text-primary mb-2">Proxy URL</label>
            <input type="text" placeholder="http://proxy.example.com:8080" className="w-full bg-bg-tertiary border border-border/50 rounded-lg px-4 py-2 text-sm" />
         </div>
    </SettingSection>
    </>
);