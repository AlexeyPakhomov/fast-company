import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getCurrentUserId } from '../../store/users';

const UserCard = ({ user }) => {
  const history = useHistory();
  const currentUserId = useSelector(getCurrentUserId());

  function handleClick() {
    history.push(history.location.pathname + '/edit');
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        {user._id === currentUserId && (
          <button
            onClick={handleClick}
            className="position-absolute top-0 end-0 btn btn-light btn-sm">
            <i className="bi bi-gear"></i>
          </button>
        )}

        <div className="d-flex flex-column align-items-center text-center position-relative">
          <img
            src={user.image}
            className="rounded-circle shadow-1-strong"
            alt="avatar"
            width="65"
            height="65"
          />
          <div className="mt-3">
            <h4>{user.name}</h4>
            <p className="text-secondary mb-1">{user.profession.name}</p>
            <div className="text-muted">
              <i className="bi bi-caret-down-fill text-primary" role="button"></i>
              <i className="bi bi-caret-up text-secondary" role="button"></i>
              <span className="ms-2">{user.rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.object,
};

export default UserCard;
