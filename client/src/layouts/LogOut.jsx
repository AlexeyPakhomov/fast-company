import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../store/users';

const LogOut = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logOut());
  }, []);

  return <h1>Loading LogOut</h1>;
};

export default LogOut;
