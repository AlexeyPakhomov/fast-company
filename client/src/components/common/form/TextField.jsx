import PropTypes from 'prop-types';
import { useState } from 'react';

const TextField = ({ name, type, label, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  function handleShowPassord() {
    setShowPassword(!showPassword);
  }

  function handleChange(e) {
    onChange({ name: e.target.name, value: e.target.value });
  }

  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <input
          type={showPassword ? 'text' : type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className={`form-control ${error ? 'is-invalid' : 'is-valid'}`}
        />
        {type === 'password' && (
          <button type="button" onClick={handleShowPassord} className="btn btn-outline-secondary">
            <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
          </button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

export default TextField;
