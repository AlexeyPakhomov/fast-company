import Select from 'react-select';
import PropTypes from 'prop-types';

const MultiSelectField = ({ options, label, name, onChange, defaultValue }) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.keys(options).map((optionsName) => ({
          label: options[optionsName].name,
          value: options[optionsName]._id,
        }))
      : options.map((q) => ({ label: q.name, value: q._id }));

  function handleChange(selectedArray) {
    onChange({ name: name, value: selectedArray });
  }

  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        name={name}
        value={defaultValue}
        options={optionsArray}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
      />
    </div>
  );
};

MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  defaultValue: PropTypes.array,
};

export default MultiSelectField;
