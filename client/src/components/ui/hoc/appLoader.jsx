import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getIsLoggedIn, getUsersLoadingStatus, loadUsersList } from '../../../store/users';
import { loadQualitiesList } from '../../../store/qualities';
import { loadProfessionsList } from '../../../store/professions';

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggegIn = useSelector(getIsLoggedIn());
  const usersLoadingStatus = useSelector(getUsersLoadingStatus());

  useEffect(() => {
    dispatch(loadQualitiesList());
    dispatch(loadProfessionsList());
    if (isLoggegIn) {
      dispatch(loadUsersList());
    }
  }, [isLoggegIn]);
  if (usersLoadingStatus) return 'Loading AppLoader';
  return children;
};

AppLoader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default AppLoader;
