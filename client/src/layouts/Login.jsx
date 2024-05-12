/* eslint-disable jsx-a11y/anchor-is-valid */
import { useParams } from 'react-router-dom';
import LoginFormPage from '../components/page/LoginFormPage';
import RegistrFormPage from '../components/page/RegistrFormPage';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteErrorAuth } from '../store/users';

const Login = () => {
  const { type } = useParams();
  const dispatch = useDispatch();

  const [formType, setFormType] = useState(type === 'registr' ? type : 'login');

  function handleChange() {
    setFormType((prevState) => (prevState === 'registr' ? 'login' : 'registr'));
  }

  useEffect(() => {
    dispatch(deleteErrorAuth());
  }, [formType]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-3">
          {formType === 'registr' ? (
            <>
              <h3 className="mb-4">Register</h3>
              <RegistrFormPage />
              <p>
                Already have account?{' '}
                <a
                  role="button"
                  onClick={handleChange}
                  className="text-danger text-decoration-none">
                  {' '}
                  Sign In
                </a>
              </p>
            </>
          ) : (
            <>
              <h3 className="mb-4">Login</h3>
              <LoginFormPage />
              <p>
                Dont have account?
                <a
                  role="button"
                  onClick={handleChange}
                  className="text-danger text-decoration-none">
                  {' '}
                  Sign Up
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
