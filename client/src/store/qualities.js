import { createSlice } from '@reduxjs/toolkit';
import qualityService from '../services/quality.service';

const qualitiesSlice = createSlice({
  name: 'qualities',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    qualitiesRequested: (state) => {
      state.isLoading = true;
    },
    qualitiesReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    qualitiesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { qualitiesRequested, qualitiesReceived, qualitiesRequestFailed } = actions;

export const loadQualitiesList = () => async (dispatch) => {
  dispatch(qualitiesRequested());
  try {
    const { content } = await qualityService.get();
    dispatch(qualitiesReceived(content));
  } catch (error) {
    dispatch(qualitiesRequestFailed(error.message));
  }
};

export const getQualitiesState = () => (state) => state.qualities.entities;

export const getQualitiesLoadingStatus = () => (state) => state.qualities.isLoading;

export const getQualitiesById = (id) => (state) => {
  const qualities = state.qualities.entities;
  if (qualities) {
    return qualities.find((quality) => quality._id === id);
  }
};

export default qualitiesReducer;
