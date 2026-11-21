import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';
export const fetchLeaderboard = createAsyncThunk('leaderboard/fetch', async ({ page = 0, size = 20 } = {}, { rejectWithValue }) => {
 try { return await api(`/leaderboard?page=${page}&size=${size}&sort=totalPoints,desc`); }
 catch(e) { return rejectWithValue(e.message); }
});
export const awardPoints = createAsyncThunk('leaderboard/award', async ({ studentId, points, reason }, { rejectWithValue }) => {
 try { return await api(`/students/${studentId}/points`, { method: 'POST', body: JSON.stringify({ points: Number(points), reason }) }); }
 catch(e) { return rejectWithValue(e.message); }
});
const slice = createSlice({ name: 'leaderboard', initialState: { content: [], page: 0, totalPages: 0, totalElements: 0, loading: false, error: null, awardLoading: false },
 reducers: { clearLeaderboardError(s) { s.error = null; } },
 extraReducers: b => {
  b.addCase(fetchLeaderboard.pending, s => { s.loading = true; s.error = null; })
   .addCase(fetchLeaderboard.fulfilled, (s,a) => { s.loading = false; s.content = a.payload.content || []; s.page = a.payload.number || 0; s.totalPages = a.payload.totalPages || 0; s.totalElements = a.payload.totalElements || 0; })
   .addCase(fetchLeaderboard.rejected, (s,a) => { s.loading = false; s.error = a.payload; });
  b.addCase(awardPoints.pending, s => { s.awardLoading = true; s.error = null; })
   .addCase(awardPoints.fulfilled, (s,a) => { s.awardLoading = false; const updated = a.payload; s.content = s.content.map(x => x.id === updated.id ? updated : x).sort((x,y) => y.totalPoints-x.totalPoints || x.fullName.localeCompare(y.fullName)); })
   .addCase(awardPoints.rejected, (s,a) => { s.awardLoading = false; s.error = a.payload; });
 }
});
export const { clearLeaderboardError } = slice.actions;
export default slice.reducer;
