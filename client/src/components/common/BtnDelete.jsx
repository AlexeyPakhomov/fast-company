import PropTypes from 'prop-types';

const BtnDelete = ({ userId, onDelete }) => {
  return (
    <button onClick={() => onDelete(userId)} className="btn btn-danger">
      delete
    </button>
  );
};

BtnDelete.propTypes = {
  userId: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BtnDelete;
