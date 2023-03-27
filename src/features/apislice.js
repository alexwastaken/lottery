import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (url) => {
    try {
      const response = await axios({
        method: 'GET',
        url: url,
        headers: {
          'X-RapidAPI-Key': '00a6c0d680msh26b3c30101217b0p1fc2bdjsncf44f42ab8d3',
          'X-RapidAPI-Host': 'ca-lottery.p.rapidapi.com'
        }
      });
      return response.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);

const userSlice = createSlice({
  name: [],
  initialState: {
    user: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;