import { useState } from "react";
import PropTypes from "prop-types";
import { cn } from "../../utils/utils";

const FileInput = ({
  minDimensions,
  maxFileSize,
  acceptedFormats,
  onFileSelected,
  onError,
  fileInputRef,
}) => {
  const [localErrorMessage, setLocalErrorMessage] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");

  const updateError = (message) => {
    setLocalErrorMessage(message);
    onError(message);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setSelectedFileName("");
      updateError("");
      return;
    }

    setSelectedFileName(file.name);

    if (!acceptedFormats.includes(file.type)) {
      updateError(`Only ${acceptedFormats.join(", ")} images are allowed.`);
      return;
    }

    if (file.size > maxFileSize) {
      updateError(
        `File size must not be greater than ${maxFileSize / 1024 / 1024} MB.`
      );
      return;
    }

    const img = new Image();
    img.onload = () => {
      if (
        img.width < minDimensions.width ||
        img.height < minDimensions.height
      ) {
        updateError(
          `Image dimensions must be at least ${minDimensions.width}x${minDimensions.height}px.`
        );
      } else {
        updateError("");
        onFileSelected(file);
      }
    };
    img.src = URL.createObjectURL(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div className="mt-[50px] w-full">
      <div className="h-[54px] flex items-center">
        <button
          className={cn(
            "body-text h-full flex items-center justify-center text-center rounded-tl rounded-bl border border-black border-opacity-90 px-4",
            localErrorMessage && "border-2 border-[#CB3D40]"
          )}
          onClick={handleButtonClick}
          type="button"
        >
          Upload
        </button>
        <div
          className={cn(
            "h-full flex items-center justify-start w-full rounded-tr rounded-br border border-[#D0CFCF] border-solid border-l-0 truncate",
            localErrorMessage && "border-2 border-[#CB3D40] border-l-0"
          )}
        >
          <input
            type="file"
            accept={acceptedFormats.join(", ")}
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className={cn(
              "px-4 body-text text-[#7e7e7e] truncate",
              selectedFileName && "text-black"
            )}
          >
            {selectedFileName ? selectedFileName : "Upload your photo"}
          </label>
        </div>
      </div>
      {localErrorMessage && (
        <p className="text-[#CB3D40] text-xs font-normal font-nunito leading-[14px] mt-1 ml-4">
          {localErrorMessage}
        </p>
      )}
    </div>
  );
};

FileInput.propTypes = {
  minDimensions: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
  maxFileSize: PropTypes.number.isRequired,
  acceptedFormats: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFileSelected: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  onError: PropTypes.func.isRequired,
  fileInputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default FileInput;
