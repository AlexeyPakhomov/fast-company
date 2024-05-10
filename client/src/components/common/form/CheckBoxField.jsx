import PropTypes from 'prop-types';

const CheckBoxField = ({ name, value, onChange, children, error }) => {
  function handleChange() {
    onChange({ name, value: !value });
  }

  return (
    <div className="form-check mb-4 ">
      <input
        className={`form-check-input ${error ? 'is-invalid' : ''}`}
        type="checkbox"
        value=""
        id={name}
        name={name}
        onChange={handleChange}
        checked={value}
        required={false}
      />
      <label className="form-check-label" htmlFor={name}>
        {children}
      </label>

      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};
CheckBoxField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  error: PropTypes.string,
};

export default CheckBoxField;
