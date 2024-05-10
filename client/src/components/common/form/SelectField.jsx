import PropTypes from 'prop-types';

const SelectField = ({ name, label, defaultValue, value, onChange, error, options }) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === 'object' ? Object.values(options) : options;

  function handleChange(e) {
    onChange({ name: e.target.name, value: e.target.value });
  }

  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>

      <select
        className={`form-select ${error && 'is-invalid'}`}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}>
        <option disabled value="">
          {defaultValue}
        </option>

        {optionsArray &&
          optionsArray.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  error: PropTypes.string,
  name: PropTypes.string,
};

export default SelectField;
