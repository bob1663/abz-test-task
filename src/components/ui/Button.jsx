import PropTypes from "prop-types";
import { cn } from "../../utils/utils";

const Button = ({ label, type, disabled, onClick, btnStyle }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "w-full whitespace-nowrap h-[34px] flex items-center justify-center bg-yellow-300 rounded-[80px] cursor-pointer hover:bg-yellow-400 transition-all text-center text-black",
        "body-text",
        disabled &&
          "bg-[#b4b4b4] cursor-not-allowed text-white hover:bg-[#b4b4b4]",
        btnStyle
      )}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  btnStyle: PropTypes.string,
};

Button.defaultProps = {
  type: "button",
  disabled: false,
  onClick: undefined,
};

export default Button;
