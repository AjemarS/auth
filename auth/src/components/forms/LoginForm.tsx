import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import authService from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import "./Form.css";

interface IFormInputs {
  email: string;
  password: string;
}

const SCHEMA = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(SCHEMA),
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    try {
      const response = await authService.login(data.email, data.password);

      if (response.token) {
        localStorage.removeItem("token");
        localStorage.setItem("token", response.token);

        if (response.role === "admin") {
          navigate("/admin/dashboard");
        } else if (response.role === "user") {
          navigate("/user-center");
        } else {
          throw new Error("Bad response role received");
        }
      } else {
        throw new Error("Token not received");
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        setError("email", { type: "manual", message: error.response.data.message });
        setError("password", { type: "manual", message: error.response.data.message });
      } else {
        setError("email", { type: "manual", message: "An unexpected error occurred" });
        setError("password", { type: "manual", message: "An unexpected error occurred" });
      }
    }
  };

  return (
    <form
      className="form"
      onSubmit={handleSubmit(onSubmit)}
      onKeyUp={(e: React.KeyboardEvent) => {
        if (e.code === "Enter") handleSubmit(onSubmit);
      }}
    >
      <span className="form__caption">Login</span>
      <div className="form__unit">
        <label className="form__label">
          Email
          <input
            className={errors.email ? "form__input invalid" : "form__input"}
            type="email"
            {...register("email")}
            autoComplete="email"
            placeholder="Enter an email"
          />
        </label>
        {errors.email && <div className="form__error">{"*" + errors.email.message}</div>}
      </div>
      <div className="form__unit">
        <label className="form__label">
          Password
          <input
            className={errors.password ? "form__input invalid" : "form__input"}
            type="password"
            {...register("password")}
            autoComplete="current-password"
            placeholder="Enter a password"
          />
        </label>
        {errors.password && <div className="form__error">{"*" + errors.password.message}</div>}
      </div>
      <button type="submit" className="form__btn--submit">
        Login
      </button>
      <div>
        Or
        <Link to="/register" className="form__link">
          Sign up
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
