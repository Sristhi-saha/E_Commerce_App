import React, { useState } from "react";
import  {LoginFromControls}  from "../../config/index";
import CommonForm from "../../components/common/form";
import { useDispatch } from "react-redux";
import { loginUserAction } from "@/store/auth-slice";
import { toast } from "sonner"

const AuthLogin = () => {
  const initialState = {
    
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();
    console.log(formData);

    dispatch(loginUserAction(formData)).then(data=>{
      if(data?.payload?.success){
        console.log(data);
        toast.success(data?.payload?.message || "Login successfully")
      }else{
        toast.error(data?.payload?.message || 'Some Error Occurred')
      }
    })

  }

  return (
    <div className="mx-auto w-full max-w-md space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Login Your Account
        </h1>
        <p>
          Don't have an account?{" "}
          <a
            href="/auth/register"
            className="text-blue-800 hover:underline"
          >
            Register
          </a>
        </p>
      </div>

      <CommonForm
        formData={formData}
        formControls={LoginFromControls}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText="Login"
      />
    </div>
  );
};

export default AuthLogin;
