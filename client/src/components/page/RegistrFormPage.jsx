import { useState, useEffect } from 'react';
import { validator } from '../../utils/validator';
import TextField from '../common/form/TextField';
import SelectField from '../common/form/SelectField';
import RadioField from '../common/form/RadioField';
import MultiSelectField from '../common/form/MultiSelectField';
import CheckBoxField from '../common/form/CheckBoxField';
import { useDispatch, useSelector } from 'react-redux';
import { getQualitiesState } from '../../store/qualities';
import { getProfessionsState } from '../../store/professions';
import { deleteErrorAuth, getAuthError, signUp } from '../../store/users';

const RegistrFormPage = () => {
  const initialState = {
    email: '',
    name: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    license: false,
  };
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const qualities = useSelector(getQualitiesState());
  const professions = useSelector(getProfessionsState());
  const registrError = useSelector(getAuthError());

  const dispatch = useDispatch();

  const validatorConfig = {
    email: {
      isRequired: { message: 'Email должен быть заполнен' },
      isEmail: { message: 'Email введен не корректно' },
    },
    name: {
      isRequired: { message: 'Имя обязательно к заполнению' },
      min: { message: 'Имя должно быть не менее 2 символов', value: 2 },
    },
    password: {
      isRequired: { message: 'Пароль должен быть заполнен' },
      isCapitalSymbol: { message: 'Пароль должен содержать заглавную букву' },
      isContainDigit: { message: 'Пароль должен содержать цифру' },
      min: { message: 'Пароль должен быть не менее 8 символов', value: 8 },
    },
    profession: {
      isRequired: { message: 'Требуется выбрать профессию' },
    },
    license: {
      isRequired: { message: 'Вы не можете пользоваться нашим сервисом без согласия с лицензией' },
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
    //console.log('e', e);
    const { name, value } = e;
    setData((prevState) => ({ ...prevState, [name]: value }));
    dispatch(deleteErrorAuth());
  }

  function handleSubmit(e) {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    //console.log('data', data);
    const newData = { ...data, qualities: data.qualities.map((q) => q.value) };
    //console.log('newData', newData);

    dispatch(signUp(newData));
    setData(initialState);
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
        name="name"
        type="text"
        label="Имя"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextField
        name="password"
        type="password"
        label="Пароль"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <SelectField
        name="profession"
        label="Выберите вашу профессию"
        defaultValue="Choose..."
        options={professions}
        value={data.profession}
        onChange={handleChange}
        error={errors.profession}
      />
      <RadioField
        name="sex"
        label="Выберите ваш пол"
        options={[
          { name: 'Male', value: 'male' },
          { name: 'Female', value: 'female' },
          { name: 'Other', value: 'other' },
        ]}
        value={data.sex}
        onChange={handleChange}
      />

      <MultiSelectField
        name="qualities"
        label="Выберите ваши качества"
        defaultValue={data.qualities}
        options={qualities}
        onChange={handleChange}
      />

      <CheckBoxField
        name="license"
        value={data.license}
        onChange={handleChange}
        error={errors.license}>
        Подтвердить лицензионное соглашение{' '}
      </CheckBoxField>
      {registrError && <p className="text-danger">{registrError}</p>}
      <button
        className="btn btn-warning w-100 mx-auto"
        disabled={Object.keys(errors).length === 0 ? false : true}>
        Submit
      </button>
    </form>
  );
};

export default RegistrFormPage;
