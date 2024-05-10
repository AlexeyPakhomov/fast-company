import { configureStore, createAction, createSlice } from '@reduxjs/toolkit';
import commentService from '../services/comment.service';
import { nanoid } from 'nanoid';
import config from '../config.json';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: [],
    isLoading: true,
    error: null,
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentCreate: (state, actions) => {
      state.entities.push(actions.payload);
    },
    commentDelete: (state, actions) => {
      state.entities = state.entities.filter((comment) => comment._id !== actions.payload);
    },
  },
});

const { reducer: commentsReducer, actions } = commentsSlice;
const { commentsRequested, commentsReceived, commentsRequestFailed, commentCreate, commentDelete } =
  actions;

const commentCreateRequested = createAction('comments/commentCreateRequested');
const commentCreateFailed = createAction('comments/commentCreateFailed');
const commentDeleteRequested = createAction('comments/commentDeleteRequested');
const commentDeleteFailed = createAction('comments/commentDeleteFailed');

export const loadCommentsList = (pageId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.getComments(pageId);
    dispatch(commentsReceived(content));
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

export const createComment =
  ({ data, pageId, userId }) =>
  async (dispatch) => {
    dispatch(commentCreateRequested());
    try {
      if (config.isFirebase) {
        const comment = {
          ...data,
          _id: nanoid(),
          pageId,
          userId,
          created_at: Date.now(),
        };
        const { content } = await commentService.createComment(comment);
        dispatch(commentCreate(content));
      } else {
        const comment = {
          ...data,
          pageId,
          userId,
        };
        const { content } = await commentService.createComment(comment);
        dispatch(commentCreate(content));
      }
    } catch (error) {
      dispatch(commentCreateFailed(error.message));
    }
  };

export const deleteComment = (commentId) => async (dispatch) => {
  dispatch(commentDeleteRequested());
  try {
    if (config.isFirebase) {
      const { content } = await commentService.deleteComment(commentId);
      if (content === null) {
        dispatch(commentDelete(commentId));
      }
    } else {
      const { content } = await commentService.deleteComment(commentId);
      if (content !== null) {
        dispatch(commentDelete(commentId));
      }
    }
  } catch (error) {
    dispatch(commentDeleteFailed(error.message));
  }
};

export const getCommentsState = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading;

export default commentsReducer;
