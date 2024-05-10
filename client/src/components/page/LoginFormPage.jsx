import { useState, useEffect } from 'react';
import { validator } from '../../utils/validator';
import TextField from '../common/form/TextField';
import CheckBoxField from '../common/form/CheckBoxField';
import { useDispatch, useSelector } from 'react-redux';
import { deleteErrorAuth, getAuthError, login } from '../../store/users';

const LoginFormPage = () => {
  const [data, setData] = useState({ email: '', password: '', rememberMe: false });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const authError = useSelector(getAuthError());

  const validatorConfig = {
    email: {
      isRequired: { message: 'Email должен быть заполнен' },
      isEmail: { message: 'Email введен не корректно' },
    },
    password: {
      isRequired: { message: 'Пароль должен быть заполнен' },
      isCapitalSymbol: { message: 'Пароль должен содержать заглавную букву' },
      isContainDigit: { message: 'Пароль должен содержать цифру' },
      min: { message: 'Пароль должен быть не менее 8 символов', value: 8 },
    },
  };

  useEffect(() => {
    validate();
  }, [data]);

  function validate() {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleChange(e) {
    const { name, value } = e;
    setData((prevState) => ({ ...prevState, [name]: value }));
    dispatch(deleteErrorAuth());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    //console.log(data);

    dispatch(login(data));
    setData({ email: '', password: '', rememberMe: false });
    //history.push(history.location.state ? history.location.state.from.pathname : '/');
  }
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="email"
        type="text"
        label="Почта"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        name="password"
        type="password"
        label="Пароль"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />

      <CheckBoxField name="rememberMe" value={data.rememberMe} onChange={handleChange}>
        Запомнить меня
      </CheckBoxField>
      {authError && <p className="text-danger">{authError}</p>}
      <button
        className="btn btn-warning w-100 mx-auto"
        disabled={Object.keys(errors).length === 0 ? false : true || authError}>
        Submit
      </button>
    </form>
  );
};

export default LoginFormPage;
