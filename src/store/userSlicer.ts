import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User, UserState } from './types';
import axios from 'axios';

export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:4000/users`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch users');
    }
  }
);

export const postUser = createAsyncThunk<User, User, { rejectValue: string }>(
  'users/postUser',
  async (user: User, { rejectWithValue }) => {
    try {
      await axios.post('http://localhost:4000/users', user);
      return user;
    } catch (error) {
      return rejectWithValue('Failed to post user');
    }
  }
);

export const updateUser = createAsyncThunk<User, User, { rejectValue: string }>(
  'users/putUser',
  async (user: User, { rejectWithValue }) => {
    try {
      await axios.put(`http://localhost:4000/users/${user.id}`, user);
      return user;
    } catch (error) {
      return rejectWithValue('Failed to put user');
    }
  }
);

export const deleteUser = createAsyncThunk('users/deleteUser', async (id: string) => {
  await axios.delete(`http://localhost:4000/users/${id}`)
  return id;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoading: false,
    data: [],
    error: null
  } as UserState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
    // FetchUsers
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
    // PostUser
      .addCase(postUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
      })
      .addCase(postUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
    // DeleteUser
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter(user => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
    // UpdateUser
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.map(user =>
          user.id === action.payload.id ? action.payload : user
        );
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Something went wrong';
      });;
      
  },
});

export default userSlice.reducer;