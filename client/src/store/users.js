import { createAction, createSlice } from '@reduxjs/toolkit';
import history from '../utils/history';
import userService from '../services/user.service';
import authService from '../services/auth.service';
import localStorageService from '../services/localStorage.service';
import { randomInt } from '../utils/randomInt';
import { generateAuthError } from '../utils/generateAuthError';
import config from '../config.json';

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false,
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false,
    };

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceivedSuccess: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequested: (state) => {
      state.error = null;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreateSuccessed: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    userLogOutSuccessed: (state) => {
      state.entities = null;
      state.auth = null;
      state.isLoggedIn = false;
      state.dataLoaded = false;
    },
    userUpdateSuccessed: (state, action) => {
      const newUserData = action.payload;
      state.entities[state.entities.findIndex((user) => user._id === newUserData._id)] =
        action.payload;
    },
    errorAuthDelete: (state) => {
      state.error = null;
    },
  },
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRequested,
  usersReceivedSuccess,
  usersRequestFailed,
  authRequested,
  authRequestSuccess,
  authRequestFailed,
  userCreateSuccessed,
  userLogOutSuccessed,
  userUpdateSuccessed,
  errorAuthDelete,
} = actions;

const userCreateRequested = createAction('users/userCreateRequested');
const userCreateFailed = createAction('users/createUserFailed');
const userUpdateRequested = createAction('users/userUpdateRequested');
const userUpdateFailed = createAction('users/userUpdateFailed');

export const deleteErrorAuth = () => (dispatch) => {
  dispatch(errorAuthDelete());
};

export const updateUser = (data) => async (dispatch) => {
  dispatch(userUpdateRequested());
  try {
    const { content } = await userService.updateCurrentUser(data);
    dispatch(userUpdateSuccessed(content));
    history.push(`/users/${content._id}`);
  } catch (error) {
    dispatch(userUpdateFailed(error.message));
  }
};

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLogOutSuccessed());
  history.push('/');
};

export const signUp = (payload) => async (dispatch) => {
  dispatch(authRequested());
  try {
    //console.log('payloadSignUpReduce', payload);

    if (config.isFirebase) {
      const { email, password, ...rest } = payload;
      const data = await authService.register(payload);
      console.log('dataSignUpReduceFirebase', data);
      localStorageService.setTokens(data);
      dispatch(authRequestSuccess({ userId: data.localId }));
      dispatch(
        createUser({
          email,
          _id: data.localId,
          image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${(Math.random() + 1)
            .toString(36)
            .substring(7)}.svg`,
          rate: randomInt(1, 5),
          completedMeetings: randomInt(0, 200),
          ...rest,
        }),
      );
    } else {
      const data = await authService.register(payload);
      //console.log('dataSignUpReduceDB', data);
      localStorageService.setTokens({
        refreshToken: data.content.refreshToken,
        idToken: data.content.accessToken,
        localId: data.content.userId,
        expiresIn: data.expiresIn,
      });
      dispatch(authRequestSuccess({ userId: data.content.userId }));
    }
    history.push('/users');
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};

function createUser(data) {
  return async function (dispatch) {
    dispatch(userCreateRequested());
    try {
      const { content } = await userService.create(data);
      dispatch(userCreateSuccessed(content));
      //history.push('/');
    } catch (error) {
      dispatch(userCreateFailed(error.message));
    }
  };
}

export const login = (payload) => async (dispatch) => {
  const { email, password } = payload;
  dispatch(authRequested);
  try {
    console.log('payloadLoginReduce', payload);

    if (config.isFirebase) {
      const data = await authService.login({ email, password });
      console.log('payloadLoginReduceFirebase', data);

      dispatch(authRequestSuccess({ userId: data.localId }));
      localStorageService.setTokens(data);
    } else {
      const data = await authService.login({ email, password });
      //console.log('payloadLoginReduceDB', data);

      dispatch(authRequestSuccess({ userId: data.content.userId }));
      localStorageService.setTokens({
        refreshToken: data.content.refreshToken,
        idToken: data.content.accessToken,
        localId: data.content.userId,
        expiresIn: data.expiresIn,
      });
    }

    //history.push(history.location.state ? history.location.state.from.pathname : '/');
    history.push('users/');
  } catch (error) {
    const { code, message } = error.response.data.error;
    //console.log({ code, message });
    if (code === 400) {
      const errorMessage = generateAuthError(message);
      dispatch(authRequestFailed(errorMessage));
    } else {
      dispatch(authRequestFailed(error.message));
    }
  }
};

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.get();
    dispatch(usersReceivedSuccess(content));
  } catch (error) {
    dispatch(usersRequestFailed(error.message));
  }
};

export const getUsersState = () => (state) => state.users.entities;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getCurrentUser = () => (state) => {
  return state.users.entities?.find((user) => user._id === state.users.auth.userId);
};
export const getUserById = (id) => (state) => {
  const users = state.users.entities;
  if (users) {
    return users.find((user) => user._id === id);
  }
};
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getAuthError = () => (state) => state.users.error;
export default usersReducer;

// export const signUp =
//({ email, password, ...rest }) =>
//async (dispatch) => {
//  dispatch(authRequested());
//  try {
//    const data = await authService.register({ email, password });
//    console.log('dataUsersReduce', data);
//    localStorageService.setTokens(data);
//    dispatch(authRequestSuccess({ userId: data.localId }));
//    dispatch(
//      createUser({
//        email,
//        _id: data.localId,
//        image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${(Math.random() + 1)
//          .toString(36)
//          .substring(7)}.svg`,
//        rate: randomInt(1, 5),
//        completedMeetings: randomInt(0, 200),
//        ...rest,
//      }),
//    );
//  } catch (error) {
//    dispatch(authRequestFailed(error.message));
//  }
//};
