import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "../../axios";
import "./forgot.css";

type ResetPasswordFormData = {
  password: string;
  confirmPassword: string;
};

export const ResetPassword: React.FC = () => {
  const [status, setStatus] = useState<"" | "success" | "error">("");
  const { token } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>();

  const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
    try {
      await axios.post(`/auth/reset-password/${token}`, {
        password: data.password,
      });
      setStatus("success");
      setTimeout(() => navigate("/loginPage"), 2000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="reset-password">
      <h5>Жаңа құпия сөз</h5>
      {status && (
        <p className={status === "error" ? "errorText" : "successText"}>
          {status}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            className="emailInput"
            type="password"
            placeholder="Жаңа құпия сөз"
            {...register("password", {
              required: "Құпия сөзді көрсетіңіз",
              minLength: {
                value: 6,
                message: "Құпия сөз кем дегенде 6 таңбадан тұруы керек",
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                message: "Құпия сөз әріптер мен сандардан тұруы керек",
              },
            })}
          />
          {errors.password && (
            <p className="errorText">{errors.password.message}</p>
          )}
        </div>

        <div className="form-group">
          <input
            className="emailInput"
            type="password"
            placeholder="Құпия сөзді қайталаңыз"
            {...register("confirmPassword", {
              required: "Құпия сөзді қайталаңыз",
              validate: (value) =>
                value === watch("password") || "Құпия сөздер сәйкес келмейді",
            })}
          />
          {errors.confirmPassword && (
            <p className="errorText">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button className="forgbtn" type="submit">
          Сақтау
        </button>
        <Link to="/loginPage">Кіруге оралу</Link>
      </form>
    </div>
  );
};