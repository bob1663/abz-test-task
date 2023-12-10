import PropTypes from "prop-types";

const Radio = ({ label, value, isChecked, onChange }) => {
  return (
    <div className="flex items-center">
      <label className="inline-flex items-center gap-3 cursor-pointer">
        {isChecked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <circle cx="10" cy="10" r="9.5" stroke="#00BDD3" />
            <circle cx="10" cy="10" r="4.5" fill="#00BDD3" stroke="#00BDD3" />
          </svg>
        ) : (
          <>
            <input
              type="radio"
              className="w-5 h-5 hidden"
              value={value}
              checked={isChecked}
              onChange={onChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <circle cx="10" cy="10" r="9.5" stroke="#D0CFCF" />
            </svg>
          </>
        )}
        <span className="body-text">{label}</span>
      </label>
    </div>
  );
};

Radio.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Radio;
