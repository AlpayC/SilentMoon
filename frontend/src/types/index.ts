// User types
export interface User {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  reminderdays?: string[];
  remindertime?: string;
  playlists: Playlist[];
  videos: string[];
}

// Playlist types
export interface Playlist {
  playlist_id: string;
}

export interface DeezerPlaylist {
  id: string;
  title: string;
  description?: string;
  picture_medium: string;
  picture_big?: string;
  nb_tracks: number;
  duration: number;
  public: boolean;
  is_loved_track?: boolean;
  collaborative?: boolean;
}

export interface DeezerTrack {
  id: string;
  title: string;
  title_short: string;
  duration: number;
  rank: number;
  explicit_lyrics: boolean;
  preview: string;
  artist: {
    id: string;
    name: string;
    picture_medium: string;
  };
  album: {
    id: string;
    title: string;
    cover_medium: string;
  };
}

// Video/Exercise types
export interface Exercise {
  _id: string;
  title: string;
  description?: string;
  duration?: number;
  difficulty?: string;
  category?: string;
  imageUrl?: string;
  videoUrl?: string;
}

// Context types
export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  refetch: () => void;
}

export interface UserDataContextType {
  userData: User | null;
  setUserData: (userData: User | null) => void;
  refetchData: (userId: string) => Promise<void>;
}

export interface DeezerDataContextType {
  playlistData: {
    data: {
      playlists: {
        items: DeezerPlaylist[];
      };
    };
  } | null;
  playlistDetails: DeezerPlaylist[];
  setPlaylistData: (data: any) => void;
  setPlaylistDetails: (details: DeezerPlaylist[]) => void;
  resetSearchDeezerData: () => void;
  isLoadingPlaylistDetails: boolean;
  isLoadingPlaylists: boolean;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface ErrorResponse {
  error: string;
  message?: string;
}

// Component props types
export interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

export interface LoadingSpinnerProps {
  text?: string;
  size?: 'small' | 'medium' | 'large';
}

export interface PlayButtonProps {
  onPlay: () => void;
  isPlaying?: boolean;
  disabled?: boolean;
}