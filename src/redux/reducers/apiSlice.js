import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import ApiServices from '../../service/ApiServices'

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    loading: false,
  },
  reducers: {
    startLoading: (state,action) => {
      state.loading = action.payload;
    },
  },
});

export const { startLoading, fetchDataSuccess, fetchDataFailure } = apiSlice.actions;
export default apiSlice.reducer;

// Async action creator
//  export const signIn = (data) => async (dispatch) => {
//   try {
//     dispatch(startLoading(true));
//     const response = await ApiServices.post('user/signin',data);
//     console.log(response);
//     dispatch(startLoading(response.data));
//   } catch (error) {
//     dispatch(fetchDataFailure(error.message));
//   }
// };

export const signIn = createAsyncThunk(
  'users/signin',
  async (data, thunkAPI) => {
    thunkAPI.dispatch(startLoading(true));
    const response = await ApiServices.post('user/signin',data);
    thunkAPI.dispatch(startLoading(false))
    return response.data
  }
)
