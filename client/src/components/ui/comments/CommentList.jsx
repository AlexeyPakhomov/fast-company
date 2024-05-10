import Comment from './Comment';

const CommentList = ({ comments, onDelete }) => {
  return comments.map((comment) => (
    <Comment key={comment._id} comment={comment} onDelete={onDelete} userId={comment.userId} />
  ));
};

export default CommentList;
