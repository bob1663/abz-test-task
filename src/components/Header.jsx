import images from "../assets/images";
import { scrollTo } from "../utils/utils";
import Button from "./ui/Button";

const Header = () => {
  return (
    <header className="flex items-center justify-center w-full h-[60px] bg-white px-4">
      <div className="flex w-full items-center justify-between max-w-[1170px]">
        <img src={images.Logo} alt="Logo" className="w-[104px] h-[26px]" />
        <div className="flex items-center gap-[10px]">
          <Button
            label="Users"
            btnStyle="w-[100px]"
            onClick={() => scrollTo("users")}
          />
          <Button
            label="Sign Up"
            btnStyle="w-[100px]"
            onClick={() => scrollTo("sign-up")}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
