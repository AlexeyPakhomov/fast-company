const TextArea = ({ name, label, value, onChange, error, rows }) => {
  function handleChange(e) {
    const { name, value } = e.target;
    onChange({ name: name, value: value });
  }
  return (
    <div className="mb-4">
      <div className="mb-3">
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className={`form-control ${error && 'is-invalid'}`}
          rows={rows}></textarea>
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

export default TextArea;
