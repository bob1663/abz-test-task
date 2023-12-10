import { cn } from "../../utils/utils";
import PropTypes from "prop-types";

const Input = ({
  id,
  label,
  type,
  helperText,
  inputStyle,
  errorMessage,
  value,
  setValue,
}) => {
  return (
    <div
      className={cn("relative w-full max-w-[380px] flex flex-col", inputStyle)}
    >
      <div className="relative">
        <input
          id={id}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type={type}
          className={cn(
            "peer w-full h-[54px] flex items-center justify-center body-text bg-transparent text-black px-4 outline-none rounded border border-[#D0CFCF]",
            errorMessage && "border-2 border-[#CB3D40]"
          )}
          placeholder=" "
        />
        <label
          htmlFor={id}
          className={cn(
            "text-base font-medium font-nunito leading-none absolute text-[#7E7E7E] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-color-bg px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-2",
            errorMessage && "text-[#CB3D40]"
          )}
        >
          {label}
        </label>
      </div>
      {errorMessage ? (
        <p className="mt-1 ml-4 text-[#CB3D40] text-xs font-normal font-nunito leading-[14px]">
          {errorMessage}
        </p>
      ) : (
        helperText && (
          <p className="mt-1 ml-4 text-[#7E7E7E] text-xs font-normal font-nunito leading-[14px]">
            {helperText}
          </p>
        )
      )}
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  inputStyle: PropTypes.string,
  errorMessage: PropTypes.string,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default Input;
