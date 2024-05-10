import PropTypes from 'prop-types';
import UserCard from '../ui/UserCard';
import QualitiesCard from '../ui/QualitiesCard';
import MeetingsCard from '../ui/MeetingsCard';
import Comments from '../ui/comments/Comments';
import { getUserById } from '../../store/users';
import { useSelector } from 'react-redux';

const UserPage = ({ userId }) => {
  const user = useSelector(getUserById(userId));

  return (
    <>
      {user ? (
        <div className="container">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <UserCard user={user} />
              <QualitiesCard qualities={user.qualities} />
              <MeetingsCard completedMeetings={user.completedMeetings} />
            </div>

            <div className="col-md-8">
              <Comments />
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading UserPage</h1>
      )}
    </>
  );
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired,
};
export default UserPage;
