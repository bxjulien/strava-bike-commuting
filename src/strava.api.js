import axios from 'axios';
import { env } from '../config';

export async function getAccessToken(code) {
  try {
    const response = await axios.post('https://www.strava.com/oauth/token', {
      client_id: env.STRAVA_CLIENT_ID,
      client_secret: env.STRAVA_CLIENT_SECRET,
      code: code,
      grant_type: 'authorization_code',
    });

    const auth = response.data;

    localStorage.setItem('accessToken', auth.access_token);
    localStorage.setItem('refreshToken', auth.refresh_token);
    localStorage.setItem('expiresAt', auth.expires_at);

    return auth;
  } catch (error) {
    console.error('Error fetching access token:', error.response.data);
    throw error;
  }
}

export async function refreshAccessToken() {
  try {
    const response = await axios.post('https://www.strava.com/oauth/token', {
      client_id: env.STRAVA_CLIENT_ID,
      client_secret: env.STRAVA_CLIENT_SECRET,
      refresh_token: localStorage.getItem('refreshToken'),
      grant_type: 'refresh_token',
    });

    const auth = response.data;

    localStorage.setItem('accessToken', auth.access_token);
    localStorage.setItem('refreshToken', auth.refresh_token);
    localStorage.setItem('expiresAt', auth.expires_at);

    return auth;
  } catch (error) {
    console.error('Error refreshing access token:', error.response.data);
    throw error;
  }
}

export async function getAthleteProfile() {
  try {
    await checkExpiry();

    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.get('https://www.strava.com/api/v3/athlete', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching athlete profile:', error.response.data);
    throw error;
  }
}

export async function uploadActivity(file) {
  try {
    const accessToken = localStorage.getItem('accessToken');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('data_type', 'gpx');
    formData.append('name', 'Vélotaf');
    formData.append('type', 'Ride');

    const response = await axios.post('https://www.strava.com/api/v3/uploads', formData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading activity:', error.response.data);
    throw error;
  }
}

export async function getActivity(activityId) {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.get('https://www.strava.com/api/v3/uploads/' + activityId, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error getting activity:', error.response.data);
    throw error;
  }
}

const checkExpiry = async () => {
  const expiresAt = localStorage.getItem('expiresAt');
  if (expiresAt && expiresAt < Date.now()) await refreshAccessToken();
}