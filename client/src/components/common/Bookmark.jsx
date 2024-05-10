import PropTypes from 'prop-types';

const Bookmark = ({ user, onChangeLike }) => {
  return <button className="bi bi-bookmark" onClick={(e) => onChangeLike(e, user)}></button>;
};

Bookmark.propTypes = {
  user: PropTypes.object.isRequired,
  onChangeLike: PropTypes.func.isRequired,
};
export default Bookmark;
