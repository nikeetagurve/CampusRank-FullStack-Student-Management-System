import * as SecureStore from 'expo-secure-store';
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080/api/v1';
export async function api(path, options = {}) {
  const token = await SecureStore.getItemAsync('campusrank_token');
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  } catch {
    throw new Error('Cannot reach CampusRank API. Check that the backend is running and the API URL is correct.');
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || `Request failed (${response.status})`);
  return data;
}
