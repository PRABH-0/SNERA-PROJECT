 
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sign from "../Signin/Sign";
import Register from "../Register/Register";

const AuthContainer: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const formType = params.get("form") as "signin" | "register" | null;

  const [activeForm, setActiveForm] = useState<"signin" | "register">("signin");

  useEffect(() => {
    if (formType === "register") setActiveForm("register");
    else if (formType === "signin") setActiveForm("signin");
  }, [formType]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--bg-section)]">
      {activeForm === "signin" ? (
        <Sign onSwitch={() => setActiveForm("register")} />
      ) : (
        <Register onSwitch={() => setActiveForm("signin")} />
      )}
    </div>
  );
};

export default AuthContainer;
