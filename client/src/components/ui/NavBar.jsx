import { Link } from 'react-router-dom';
import NavProfile from './NavProfile';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../store/users';

const NavBar = () => {
  const currentUser = useSelector(getCurrentUser());

  return (
    <nav className="navbar bg-light mb-3">
      <div className="container-fluid">
        <ul className="nav">
          <li className="nav-item">
            <Link to="/" className="nav-link" aria-current="page">
              Main
            </Link>
          </li>
          {currentUser && (
            <li className="nav-item">
              <Link to="/users" className="nav-link" aria-current="page">
                Users
              </Link>
            </li>
          )}
        </ul>
        <div className="d-flex">
          {currentUser ? (
            <NavProfile />
          ) : (
            <Link to="/login" className="nav-link" aria-current="page">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
