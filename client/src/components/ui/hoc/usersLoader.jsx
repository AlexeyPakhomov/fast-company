import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataStatus, loadUsersList } from '../../../store/users';
import PropTypes from 'prop-types';

const UsersLoader = ({ children }) => {
  const dispatch = useDispatch();
  const dataStatus = useSelector(getDataStatus());

  useEffect(() => {
    if (!dataStatus) {
      dispatch(loadUsersList());
    }
  }, []);

  if (!dataStatus) return 'Loading UsersLoader';
  return children;
};

UsersLoader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default UsersLoader;
