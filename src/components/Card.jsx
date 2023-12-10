import { useState } from "react";
import profileCover from "../assets/images/photoCover.svg";
import PropTypes from "prop-types";

const Card = ({ data }) => {
  const [imageSrc, setImageSrc] = useState(data.photo);

  const handleImgError = () => {
    setImageSrc(profileCover);
  };

  return (
    <div
      className="w-full h-[254px] bg-white rounded-[10px] flex flex-col
     items-center p-5 gap-5 text-center cursor-pointer transition-all hover:shadow-md"
    >
      <img
        loading="lazy"
        src={imageSrc}
        alt="User Photo"
        className="w-[70px] h-[70px] rounded-full"
        onError={handleImgError}
      />
      <p className="body-text truncate w-full" title={data.name}>
        {data.name}
      </p>
      <div className="flex flex-col w-full">
        <p className="body-text truncate" title={data.position}>
          {data.position}
        </p>
        <p className="body-text truncate" title={data.email}>
          {data.email}
        </p>
        <p className="body-text truncate" title={data.phone}>
          {data.phone}
        </p>
      </div>
    </div>
  );
};

Card.propTypes = {
  data: PropTypes.shape({
    photo: PropTypes.string,
    name: PropTypes.string,
    position: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
};

export default Card;
