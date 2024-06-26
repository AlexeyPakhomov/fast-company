import { createSlice } from '@reduxjs/toolkit';
import professionService from '../services/profession.service';

const professionsSlice = createSlice({
  name: 'professions',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    professionsRequested: (state) => {
      state.isLoading = true;
    },
    professionsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    professionsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: professionsReducer, actions } = professionsSlice;
const { professionsRequested, professionsReceived, professionsRequestFailed } = actions;

export const loadProfessionsList = () => async (dispatch) => {
  dispatch(professionsRequested());
  try {
    const { content } = await professionService.get();
    dispatch(professionsReceived(content));
  } catch (error) {
    dispatch(professionsRequestFailed(error.message));
  }
};

export const getProfessionsState = () => (state) => state.professions.entities;

export const getProfessionsLoadingStatus = () => (state) => state.professions.isLoading;

export const getProfessionsById = (id) => (state) => {
  const professions = state.professions.entities;
  if (professions) {
    return professions.find((profession) => profession._id === id);
  }
};

export default professionsReducer;
