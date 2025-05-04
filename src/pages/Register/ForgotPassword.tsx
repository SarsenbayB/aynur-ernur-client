import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "../../axios";
import { Link } from "react-router-dom";
import "./forgot.css";

type ForgotPasswordFormData = {
  email: string;
};

export const ForgotPassword: React.FC = () => {
  const [status, setStatus] = useState<"" | "success" | "error">("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>();

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = async (data) => {
    try {
      await axios.post("/auth/forgot-password", data);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="forgot-password">
      <h5>Құпия сөзді қалпына келтіру</h5>
      {status === "success" && (
        <p className="successText">
          Құпия сөзді қалпына келтіру нұсқаулары email-ге жіберілді
        </p>
      )}
      {status === "error" && (
        <p className="errorText">Қате шықты. Қайтадан көріңіз</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className={`emailInput ${errors.email ? "error" : ""}`}
          type="email"
          placeholder="E-Mail"
          {...register("email", {
            required: "Email көрсетіңіз",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Жарамды email мекенжайын көрсетіңіз",
            },
          })}
        />
        {errors.email && <p className="errorText">{errors.email.message}</p>}

        <button className="forgbtn" type="submit">
          Жіберу
        </button>
        <Link to="/loginPage">Кіруге оралу</Link>
      </form>
    </div>
  );
};
