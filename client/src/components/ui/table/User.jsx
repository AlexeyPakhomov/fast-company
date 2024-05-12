import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Qualitie from '../../common/Qualitie';
//import Bookmark from '../../common/Bookmark';
import Profession from '../../common/Profession';

const User = ({ user, onChangeLike }) => {
  const { _id, name, profession, qualities, completedMeetings, rate } = user;

  const history = useHistory();

  function handleUserId() {
    history.push(`/users/${_id}`);
  }

  return (
    <tr>
      <td onClick={handleUserId} role="button">
        {name}
      </td>
      <td>
        {qualities.map((qualitie) => {
          return <Qualitie key={qualitie} id={qualitie} />;
        })}
      </td>
      <td>
        <Profession id={profession} />
      </td>
      <td>{completedMeetings}</td>
      <td>{`${rate} /5`}</td>
      {/*<td className="align-middle">
        <Bookmark user={user} onChangeLike={onChangeLike} />
      </td>*/}
    </tr>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
  onChangeLike: PropTypes.func.isRequired,
};

export default User;
