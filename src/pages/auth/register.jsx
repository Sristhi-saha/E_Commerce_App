import React, { useState } from "react";
import  {registerFormControls}  from "../../config/index";
import CommonForm from "../../components/common/form";

const AuthRegister = () => {
  const initialState = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialState);

  function onSubmit(e) {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new Account
        </h1>
        <p>
          Already have an account?{" "}
          <a
            href="/auth/login"
            className="text-blue-800 hover:underline"
          >
            Login
          </a>
        </p>
      </div>

      <CommonForm
        formData={formData}
        formControls={registerFormControls}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText="Register"
      />
    </div>
  );
};

export default AuthRegister;
