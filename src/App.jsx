import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import CallToAction from "./sections/CallToAction";
import Users from "./sections/Users";
import SignUp from "./sections/SignUp";
import { useState } from "react";

const App = () => {
  const [userAdded, setUserAdded] = useState(false);

  const handleUserAdded = () => {
    setUserAdded(true);
  };

  return (
    <div className="w-full h-full flex flex-col bg-color-bg">
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <CallToAction />
      <Users userAdded={userAdded} setUserAdded={setUserAdded} />
      <SignUp onUserAdded={handleUserAdded} />
    </div>
  );
};

export default App;
