import React, { useState } from 'react';
import { ToolsSidebar } from './components/Sidebar/ToolsSidebar';
import { Header } from './components/Header/Header';
import { PreviewCanvas } from './components/Editor/PreviewCanvas';
import { Timeline } from './components/Editor/Timeline';
import { FloatingToolbar } from './components/FloatingToolbar/FloatingToolbar';
import { SettingsModal } from './components/Modals/SettingsModal';
import { RightSidebar } from './components/Sidebar/RightSidebar';
import { Asset } from './types';

const App: React.FC = () => {
  const [activeToolId, setActiveToolId] = useState<string>('selection');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleToolSelect = (toolId: string) => {
    console.log(`Tool selected: ${toolId}`);
    setActiveToolId(toolId);
  };

  // Mock Assets with correct types matching the new Asset interface
  const assets: Asset[] = [
    { id: 1, type: 'video', src: 'https://picsum.photos/200?random=1', duration: '00:15', name: 'Beach_Trip.mp4' },
    { id: 2, type: 'image', src: 'https://picsum.photos/200?random=2', duration: '05:00', name: 'Thumbnail_v1.jpg' },
    { id: 3, type: 'video', src: 'https://picsum.photos/200?random=3', duration: '00:45', name: 'Interview_CamA.mov' },
    { id: 4, type: 'audio', src: null, duration: '03:20', name: 'Chill_LoFi_Beat.mp3' },
    { id: 5, type: 'image', src: 'https://picsum.photos/200?random=5', duration: '05:00', name: 'Logo_White.png' },
    { id: 6, type: 'text', src: null, duration: '00:10', name: 'Intro Title' },
    { id: 7, type: 'video', src: 'https://picsum.photos/200?random=7', duration: '01:20', name: 'Drone_Shot.mp4' },
    { id: 8, type: 'audio', src: null, duration: '00:05', name: 'Swoosh_SFX.wav' },
    { id: 9, type: 'image', src: 'https://picsum.photos/200?random=8', duration: '05:00', name: 'Overlay_Glitch.png' },
    { id: 10, type: 'video', src: 'https://picsum.photos/200?random=9', duration: '00:12', name: 'Transition_Matte.mp4' },
    { id: 11, type: 'folder', src: null, itemCount: 5, name: 'Project_Summer_2024' },
  ];

  return (
    <div className="flex flex-col h-screen w-screen bg-bg-primary text-text-primary font-sans selection:bg-accent-primary/30 overflow-hidden">
      
      <Header onOpenSettings={() => setIsSettingsOpen(true)} />
      
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar */}
        <ToolsSidebar 
            activeToolId={activeToolId} 
            onToolSelect={handleToolSelect} 
        />

        {/* Main Work Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-bg-primary relative">
            
            {/* Upper: Preview & Assets */}
            <div className="flex-1 flex overflow-hidden">
                <PreviewCanvas />
                
                {/* NEW Right Panel: Export + Media Library + Controls */}
                <RightSidebar assets={assets} />
            </div>

            {/* Lower: Timeline */}
            <Timeline />

            {/* Draggable Toolbar Overlay (Always visible tools) */}
            <FloatingToolbar onToolSelect={handleToolSelect} />
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </div>
  );
};

export default App;