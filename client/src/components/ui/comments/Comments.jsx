import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormNewComment from './FormNewComment';
import CommentList from './CommentList';
import {
  createComment,
  deleteComment,
  getCommentsLoadingStatus,
  getCommentsState,
  loadCommentsList,
} from '../../../store/comments';
import { getCurrentUserId } from '../../../store/users';

const Comments = () => {
  const dispatch = useDispatch();
  const pageId = useParams().userId;
  const userId = useSelector(getCurrentUserId());
  const commentsLoading = useSelector(getCommentsLoadingStatus());

  useEffect(() => {
    dispatch(loadCommentsList(pageId));
  }, []);

  const comments = useSelector(getCommentsState());
  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at),
  );

  function handleSubmit(data) {
    dispatch(createComment({ data, pageId, userId }));
  }

  const handleDeleteComment = (id) => {
    dispatch(deleteComment(id));
  };

  return (
    <>
      <div className="card mb-2">
        {' '}
        <div className="card-body ">
          <h2>New comments</h2>
          <FormNewComment onSubmit={handleSubmit}></FormNewComment>
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-body ">
          <h2>Comments</h2>
          <hr />
          {!commentsLoading ? (
            sortedComments ? (
              <CommentList comments={sortedComments} onDelete={handleDeleteComment} />
            ) : (
              <p>Комментарии отсутствуют</p>
            )
          ) : (
            'Loading Comments'
          )}
        </div>
      </div>
    </>
  );
};

export default Comments;
