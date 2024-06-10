import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Form.css";

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
    setError,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(SCHEMA),
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", data);
      navigate("/login");
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
      <span className="form__caption">Sign up</span>
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
      <button type="submit" className="form__btn--submit more-margin">
        Sign up
      </button>
    </form>
  );
};

export default RegisterForm;
