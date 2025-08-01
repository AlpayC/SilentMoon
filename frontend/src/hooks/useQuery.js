import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// API functions
const api = {
  // Deezer API calls
  getPlaylists: () => axios.get('/api/deezer/playlist').then(res => res.data),
  getPlaylistDetails: (ids) => axios.post('/api/deezer/getPlaylistDetails', { ids }).then(res => res.data),
  getTracks: (id) => axios.post('/api/deezer/tracks', { id }).then(res => res.data),
  getTrack: (id) => axios.get(`/api/deezer/onetrack/${id}`).then(res => res.data),
  
  // User API calls
  getUserData: (userId) => axios.post('/api/user/getUserData', { _id: userId }).then(res => res.data),
  addToFavorites: (data) => axios.put('/api/user/addexercise', data).then(res => res.data),
  removeFromFavorites: (data) => axios.put('/api/user/deleteexercise', data).then(res => res.data),
  addPlaylist: (data) => axios.put('/api/user/addplaylist', data).then(res => res.data),
  removePlaylist: (data) => axios.put('/api/user/deleteplaylist', data).then(res => res.data),
  
  // Exercise API calls
  getExercises: () => axios.get('/api/exercises').then(res => res.data),
  getExerciseDetails: (id) => axios.get(`/api/exercises/details/${id}`).then(res => res.data),
  getFilteredExercises: (filters) => axios.get('/api/exercises/filter', { params: filters }).then(res => res.data),
};

// Query keys
export const queryKeys = {
  playlists: ['playlists'],
  playlistDetails: (ids) => ['playlistDetails', ids],
  tracks: (id) => ['tracks', id],
  track: (id) => ['track', id],
  userData: (userId) => ['userData', userId],
  exercises: ['exercises'],
  exerciseDetails: (id) => ['exerciseDetails', id],
  filteredExercises: (filters) => ['filteredExercises', filters],
};

// Custom hooks
export const usePlaylists = () => {
  return useQuery({
    queryKey: queryKeys.playlists,
    queryFn: api.getPlaylists,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const usePlaylistDetails = (ids, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.playlistDetails(ids),
    queryFn: () => api.getPlaylistDetails(ids),
    enabled: enabled && ids && ids.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useTracks = (playlistId, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.tracks(playlistId),
    queryFn: () => api.getTracks(playlistId),
    enabled: enabled && !!playlistId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useTrack = (trackId, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.track(trackId),
    queryFn: () => api.getTrack(trackId),
    enabled: enabled && !!trackId,
    staleTime: 10 * 60 * 1000,
  });
};

export const useUserData = (userId, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.userData(userId),
    queryFn: () => api.getUserData(userId),
    enabled: enabled && !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useExercises = () => {
  return useQuery({
    queryKey: queryKeys.exercises,
    queryFn: api.getExercises,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

export const useExerciseDetails = (exerciseId, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.exerciseDetails(exerciseId),
    queryFn: () => api.getExerciseDetails(exerciseId),
    enabled: enabled && !!exerciseId,
    staleTime: 10 * 60 * 1000,
  });
};

// Mutations
export const useAddToFavorites = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.addToFavorites,
    onSuccess: (data, variables) => {
      // Invalidate user data to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.userData(variables._id) });
    },
  });
};

export const useRemoveFromFavorites = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.removeFromFavorites,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.userData(variables._id) });
    },
  });
};

export const useAddPlaylist = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.addPlaylist,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.userData(variables._id) });
    },
  });
};

export const useRemovePlaylist = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.removePlaylist,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.userData(variables._id) });
    },
  });
};