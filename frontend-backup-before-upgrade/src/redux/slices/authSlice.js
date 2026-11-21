import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import { api } from '../../services/api';
export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try { const data = await api('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
    await SecureStore.setItemAsync('campusrank_token', data.token); return data;
  } catch (e) { return rejectWithValue(e.message); }
});
export const register = createAsyncThunk('auth/register', async (payload, { rejectWithValue }) => {
  try { const data = await api('/auth/register', { method: 'POST', body: JSON.stringify(payload) });
    await SecureStore.setItemAsync('campusrank_token', data.token); return data;
  } catch (e) { return rejectWithValue(e.message); }
});
export const restoreSession = createAsyncThunk('auth/restore', async (_, { rejectWithValue }) => {
  try { const token = await SecureStore.getItemAsync('campusrank_token'); if (!token) return null;
    const user = await api('/auth/me'); return { token, user };
  } catch { await SecureStore.deleteItemAsync('campusrank_token'); return rejectWithValue('Session expired'); }
});
const slice = createSlice({ name: 'auth', initialState: { user: null, token: null, loading: false, initialized: false, error: null },
 reducers: { logout(state) { state.user = null; state.token = null; state.error = null; SecureStore.deleteItemAsync('campusrank_token'); }, clearAuthError(state) { state.error = null; } },
 extraReducers: b => {
  [login, register].forEach(thunk => b.addCase(thunk.pending, s => { s.loading = true; s.error = null; })
   .addCase(thunk.fulfilled, (s,a) => { s.loading = false; s.user = a.payload.user; s.token = a.payload.token; })
   .addCase(thunk.rejected, (s,a) => { s.loading = false; s.error = a.payload || 'Something went wrong'; }));
  b.addCase(restoreSession.fulfilled, (s,a) => { s.initialized = true; if (a.payload) { s.user = a.payload.user; s.token = a.payload.token; } })
   .addCase(restoreSession.rejected, s => { s.initialized = true; s.user = null; s.token = null; });
 }
});
export const { logout, clearAuthError } = slice.actions;
export default slice.reducer;
