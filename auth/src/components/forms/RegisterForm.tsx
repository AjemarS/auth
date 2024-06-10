import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface IFormInputs {
  email: string;
  password: string;
  confirmPassword?: string;
}

const SCHEMA = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password"), undefined], "Passwords must match"),
});

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(SCHEMA),
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", data);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyUp={(e: React.KeyboardEvent) => {
        if (e.code === "Enter") handleSubmit(onSubmit);
      }}
    >
      <div>
        <label>Email</label>
        <input {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Password</label>
        <input type="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label>Confirm Password</label>
        <input type="password" {...register("confirmPassword")} />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
