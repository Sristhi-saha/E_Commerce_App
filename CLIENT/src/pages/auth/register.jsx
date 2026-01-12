import React, { useState } from "react";
import  {registerFormControls}  from "../../config/index";
import CommonForm from "../../components/common/form";
import { useDispatch } from "react-redux";
import { registerUserAction } from "@/store/auth-slice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AuthRegister = () => {
  const initialState = {
    username: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  function onSubmit(e) {
    e.preventDefault();
    console.log(formData);
    dispatch(registerUserAction(formData)).then((data)=>{
      console.log(data);
      if(data?.payload?.success) {
        toast.success(data?.payload?.message || "Registration successful!");
        navigate('/auth/login');
      } else {
        toast.error(data?.payload?.message || "Registration failed");
      }
      navigate('/auth/login');
    });
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
            Login please
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
