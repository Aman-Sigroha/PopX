const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://popx-server.onrender.com';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login`,
  REGISTER: `${API_BASE_URL}/register`,
  PROFILE_PICTURE: (userId) => `${API_BASE_URL}/profile-picture/${userId}`,
  UPLOAD_PROFILE_PICTURE: `${API_BASE_URL}/upload-profile-picture`,
}; 