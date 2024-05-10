import React, { useState, useEffect } from 'react';
import { validator } from '../../utils/validator';
import TextField from '../common/form/TextField';
import SelectField from '../common/form/SelectField';
import RadioField from '../common/form/RadioField';
import MultiSelectField from '../common/form/MultiSelectField';
import { useDispatch, useSelector } from 'react-redux';
import { getQualitiesLoadingStatus, getQualitiesState } from '../../store/qualities';
import { getProfessionsLoadingStatus, getProfessionsState } from '../../store/professions';
import { getCurrentUser, updateUser } from '../../store/users';

const EditUserPage = () => {
  const [userData, setUserData] = useState();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser());

  const qualities = useSelector(getQualitiesState());
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus());

  const professions = useSelector(getProfessionsState());
  const professionsLoading = useSelector(getProfessionsLoadingStatus());

  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!professionsLoading && !qualitiesLoading && currentUser && !userData) {
      setUserData({ ...currentUser, qualities: transformQualities(currentUser.qualities) });
    }
  }, [professionsLoading, qualitiesLoading, currentUser, userData]);

  useEffect(() => {
    if (userData && isLoading) {
      setIsLoading(false);
    }
  }, [userData]);

  useEffect(() => {
    validate();
  }, [userData]);

  function transformQualities(data) {
    return data.map((qualityId) => {
      const q = qualities.find((quality) => quality._id === qualityId);
      if (q) {
        return { label: q.name, value: q._id };
      }
    });
  }

  const validatorConfig = {
    name: { isRequired: { message: 'Имя не может быть пустым' } },
    email: {
      isRequired: { message: 'Email должен быть заполнен' },
      isEmail: { message: 'Email введен некорректно' },
    },
  };

  function validate() {
    const errors = validator(userData, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleChange(e) {
    const { name, value } = e;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  }

  function getQualities(qualitiesArray) {
    const qualitiesArr = [];
    qualitiesArray.map((qualitie) => {
      qualitiesArr.push(qualitie.value);
    });
    return qualitiesArr;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const { qualities } = userData;
    dispatch(
      updateUser({
        ...userData,
        qualities: getQualities(qualities),
      }),
    );

    //console.log('EditUserPage', {
    //  ...userData,
    //  qualities: getQualities(qualities),
    //});
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-3">
          {isLoading && Object.keys(errors).length > 0 ? (
            <p>Loading EditUserPage</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <TextField
                name="name"
                type="text"
                label="Имя"
                value={userData?.name || ''}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                name="email"
                type="text"
                label="Email"
                value={userData?.email || ''}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectField
                name="profession"
                label="Выберите свою профессию"
                defaultValue="Choose..."
                options={professions}
                value={userData?.profession || ''}
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
                value={userData?.sex || ''}
                onChange={handleChange}
              />
              <MultiSelectField
                name="qualities"
                label="Выберите ваши качества"
                defaultValue={userData?.qualities || []}
                options={qualities}
                onChange={handleChange}
              />
              <button
                type="submit"
                disabled={Object.keys(errors).length > 0 ? true : false}
                className="btn btn-warning w-100 mx-auto">
                {' '}
                Обновить
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;
