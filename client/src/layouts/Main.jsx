import useMockData from '../utils/mockData';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../store/users';

const Main = () => {
  const currentUser = useSelector(getCurrentUser());
  let isValid = false;

  if (currentUser) {
    isValid = process.env.REACT_APP_ADMIN_ID === currentUser._id;
  }

  const { error, status, progress, initialize } = useMockData();
  const handleClick = () => {
    initialize();
  };

  return (
    <div className="container mt-5">
      <h1>Main Page</h1>
      <h3>Инициализация данных в Firebase</h3>
      <ul>
        <li>Status: {status}</li>
        <li>Progress: {progress} </li>
        {error && <li>Error: {error}</li>}
      </ul>
      <button
        onClick={handleClick}
        className="btn btn-warning"
        disabled={!isValid || progress === 100}>
        Инициализировать
      </button>
    </div>
  );
};

export default Main;
