import { LucideIcon } from 'lucide-react';

export interface Tool {
  id: string;
  icon: LucideIcon;
  label: string;
  shortcut?: string;
  action: string;
}

export interface TrackClip {
  id: string;
  name: string;
  start: number;
  duration: number;
  type: 'video' | 'audio' | 'text';
  color: string;
}

export interface Track {
  id: string;
  name: string;
  type: 'video' | 'audio' | 'text';
  clips: TrackClip[];
}

export interface ToolbarPosition {
  x: number;
  y: number;
}

export interface Asset {
  id: number | string;
  type: 'video' | 'audio' | 'image' | 'text' | 'folder';
  src: string | null;
  duration?: string;
  name: string;
  itemCount?: number;
}