import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import Input from "../components/ui/Input";
import Radio from "../components/ui/Radio";
import Button from "../components/ui/Button";
import Preloader from "../components/ui/Preloader";
import FileInput from "../components/ui/FileInput";
import { cn, emailPattern, phonePattern, toastStyle } from "../utils/utils";
import images from "../assets/images";

const SignUp = ({ onUserAdded }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState({
    name: "",
    phone: "",
    email: "",
    position: null,
    photo: null,
  });

  // FETCHING TOKEN
  const fetchToken = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_LINK}/token`);
      const data = await response.json();
      console.log("Fetched new token:", data.token);
      return data.token;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // FETCHING POSITIONS
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_LINK}/positions`
        );
        const data = await response.json();
        setPositions(data.positions);
        console.log(data.positions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPositions();
  }, []);

  // CHANGING POSITIONS
  const handlePositionChange = (position) => {
    setUser((prevState) => ({ ...prevState, position }));
  };

  // IMAGE HANDLER

  const fileInputRef = useRef(null);

  const [fileError, setFileError] = useState("");

  const handleFileError = (error) => {
    setFileError(error);
  };

  const handleFileChange = (file) => {
    setUser((prevState) => ({ ...prevState, photo: file }));
  };

  // NAME FIELD
  const [nameError, setNameError] = useState("");

  const validateName = (name) => {
    if (!name.trim()) return "Name is required.";
    if (name.length < 2) return "Name must be at least 2 characters long.";
    if (name.length > 60) return "Name must not exceed 60 characters.";
    return "";
  };

  const handleNameChange = (value) => {
    setUser((prevState) => ({ ...prevState, name: value }));
    const errorMsg = validateName(value);
    setNameError(errorMsg);
  };

  // EMAIL FIELD
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    if (!email.trim()) return "Email is required.";
    if (email.length < 2) return "Email must be at least 2 characters long.";
    if (email.length > 100) return "Email must not exceed 100 characters.";
    if (!emailPattern.test(email)) return "Invalid email format.";

    return "";
  };

  const handleEmailChange = (value) => {
    setUser((prevState) => ({ ...prevState, email: value }));
    const errorMsg = validateEmail(value);
    setEmailError(errorMsg);
  };

  // PHONE FIELD
  const [phoneError, setPhoneError] = useState("");

  const validatePhone = (phone) => {
    if (!phone.trim()) return "Phone number is required.";
    if (!phonePattern.test(phone))
      return "Invalid phone number. Format: +380XXXXXXXXX";

    return "";
  };

  const handlePhoneChange = (value) => {
    setUser((prevState) => ({ ...prevState, phone: value }));
    const errorMsg = validatePhone(value);
    setPhoneError(errorMsg);
  };

  // RESET FIELDS
  const resetFields = () => {
    setUser({ name: "", phone: "", email: "", position: null, file: null });
  };

  // SENDING DATA
  const [userAdded, setUserAdded] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (nameError || emailError || phoneError || fileError) {
      toast.error("Please correct the errors before submitting.", toastStyle);
      return;
    }

    setIsLoading(true);

    try {
      const token = await fetchToken();

      if (!token) {
        toast.error("Failed to fetch a valid token.", toastStyle);
        setIsLoading(false);
        return;
      }

      const newUser = new FormData();
      newUser.append("name", user.name);
      newUser.append("email", user.email);
      newUser.append("phone", user.phone);
      newUser.append("position_id", user.position);
      newUser.append("photo", user.photo);

      const response = await fetch(`${import.meta.env.VITE_API_LINK}/users`, {
        method: "POST",
        headers: {
          Token: token,
        },
        body: newUser,
      });

      const data = await response.json();

      if (data.success) {
        onUserAdded();
        resetFields();
        setUserAdded(true);
      } else {
        toast.error("Error: " + data.message, toastStyle);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while submitting the form.", toastStyle);
    } finally {
      setIsLoading(false);
    }
  };

  if (userAdded) {
    return (
      <section
        className="w-full flex items-center justify-center
  max-w-[1170px] self-center flex-col px-4"
        id="sign-up"
      >
        <h1 className="heading-text text-center">
          User successfully registered
        </h1>
        <img
          src={images.AfterRegister}
          alt="Success Register"
          className="mt-[50px]"
        />
        <Button
          label="Close"
          onClick={() => setUserAdded(false)}
          btnStyle="mb-[100px] mt-[50px] max-w-[100px]"
        />
      </section>
    );
  }

  return (
    <section
      className="w-full flex items-center justify-center
  max-w-[1170px] self-center flex-col px-4"
      id="sign-up"
    >
      <h1 className="heading-text text-center">Working with POST request</h1>
      {isLoading && (
        <div className="absolute mb-[100px] z-20">
          <Preloader />
        </div>
      )}
      <form
        className={cn(
          "flex flex-col mt-[50px] mb-[100px] w-full max-w-[380px] relative",
          isLoading && "animate-pulse blur"
        )}
        onSubmit={handleSubmit}
      >
        <Input
          id="nameInput"
          label="Your name"
          type="text"
          value={user.name}
          setValue={handleNameChange}
          errorMessage={nameError}
        />
        <Input
          id="emailInput"
          label="Email"
          type="email"
          inputStyle="mt-[50px]"
          value={user.email}
          setValue={handleEmailChange}
          errorMessage={emailError}
        />
        <Input
          id="phoneInput"
          label="Phone"
          type="text"
          helperText="+38 (XXX) XXX - XX - XX"
          inputStyle="mt-[50px]"
          value={user.phone}
          setValue={handlePhoneChange}
          errorMessage={phoneError}
        />
        <p className="mt-[25px] body-text">Select your position</p>
        <div className="flex flex-col mt-3 gap-[7px]">
          {positions.map((position) => (
            <Radio
              label={position.name}
              key={position.id}
              value={position.id}
              isChecked={user.position === position.id}
              onChange={() => handlePositionChange(position.id)}
            />
          ))}
        </div>
        <FileInput
          minDimensions={{ width: 70, height: 70 }}
          maxFileSize={5 * 1024 * 1024}
          acceptedFormats={["image/jpeg"]}
          onFileSelected={handleFileChange}
          fileInputRef={fileInputRef}
          onError={handleFileError}
        />
        <Button
          label={isLoading ? "Signing up..." : "Sign up"}
          type="submit"
          btnStyle="max-w-[100px] mt-[50px] self-center"
          disabled={
            !user.name ||
            !user.email ||
            !user.phone ||
            !user.position ||
            !user.photo ||
            fileError ||
            nameError ||
            emailError ||
            phoneError ||
            isLoading
          }
        />
      </form>
    </section>
  );
};

SignUp.propTypes = {
  onUserAdded: PropTypes.func.isRequired,
};

export default SignUp;
