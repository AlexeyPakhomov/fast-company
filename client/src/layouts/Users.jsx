import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCurrentUserId } from '../store/users';
import UsersLoader from '../components/ui/hoc/usersLoader';
import UserPage from '../components/page/UserPage';
import UsersListPage from '../components/page/UsersListPage';
import EditUserPage from '../components/page/EditUserPage';
import Button from '../components/common/Button';

const Users = () => {
  const params = useParams();
  const history = useHistory();
  const { userId, edit } = params;
  const currentUserId = useSelector(getCurrentUserId());

  return (
    <>
      <UsersLoader>
        {userId ? (
          edit ? (
            userId === currentUserId ? (
              <>
                <Button
                  onClick={() => history.goBack()}
                  type="button"
                  btnText={`◃ Назад`}
                  cssBtn="btn btn-warning btn-sm m-3 "
                />
                <EditUserPage />
              </>
            ) : (
              <Redirect to={`/users/${currentUserId}/edit`} />
            )
          ) : (
            <UserPage userId={userId} />
          )
        ) : (
          <UsersListPage />
        )}
      </UsersLoader>
    </>
  );
};

export default Users;
