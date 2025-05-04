import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { AppDispatch } from "../../redux/store";
import "./registerPage.css";

interface IRegisterForm {
  fullName: string;
  email: string;
  password: string;
}

export const RegisterPage: React.FC = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch<AppDispatch>();
  const [registerStatus, setRegisterStatus] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IRegisterForm>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IRegisterForm> = async (values) => {
    try {
      const data = await dispatch(fetchRegister(values));

      if (!data.payload) {
        setRegisterStatus("Тіркелу кезінде қате шықты!");
        return;
      }

      if (data.payload && typeof data.payload === "object" && "message" in data.payload) {
        setRegisterStatus((data.payload as { message: string }).message);
        return;
      }
      if (data.payload && typeof data.payload === "object" && "token" in data.payload) {
        window.localStorage.setItem("token", (data.payload as { token: string }).token);
        setRegisterStatus("Сіздің email-ге растау сілтемесі жіберілді");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setRegisterStatus("Тіркелу кезінде қате шықты!");
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="register">
      <div className="rootsregister">
        <h5 className="title">Аккаунтты тіркеу</h5>

        {registerStatus && (
          <p
            className={
              registerStatus.includes("қате") ? "errorText" : "successText"
            }
          >
            {registerStatus}
          </p>
        )}

        <form className="formRegister" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              className={`field ${errors.fullName ? "error" : ""}`}
              type="text"
              placeholder="Т.А.Ж"
              {...register("fullName", {
                required: "Толық аты жөніңізді көрсетіңіз",
                minLength: {
                  value: 3,
                  message: "Аты-жөні кем дегенде 3 таңбадан тұруы керек",
                },
              })}
            />
            {errors.fullName && (
              <p className="errorText">{errors.fullName.message}</p>
            )}
          </div>

          <div className="form-group">
            <input
              className={`field ${errors.email ? "error" : ""}`}
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
            {errors.email && (
              <p className="errorText">{errors.email.message}</p>
            )}
          </div>

          <div className="form-group">
            <input
              className={`field ${errors.password ? "error" : ""}`}
              type="password"
              placeholder="Құпия сөз"
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

          <button disabled={!isValid} type="submit" className="button">
            Тіркелу
          </button>
        </form>

        <div className="links">
          <Link className="linkPage" to="/loginPage">
            Кіру
          </Link>
        </div>
      </div>
    </div>
  );
};
