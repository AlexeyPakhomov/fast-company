import PropTypes from 'prop-types';

const Button = ({ onClick, btnText, cssDiv, cssBtn, type, disabled }) => {
  return (
    <div className={cssDiv}>
      <button className={cssBtn} type={type} onClick={onClick} disabled={disabled}>
        {btnText}
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  btnText: PropTypes.string,
  cssDiv: PropTypes.string,
  cssBtn: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
