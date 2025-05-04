import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import "./loginPage.css";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import { AppDispatch } from "../../redux/store";
interface ILoginForm {
  email: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ILoginForm> = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      return alert("Кіру мүмкін болмады!");
    }

    if (data.payload && typeof data.payload === "object" && "token" in data.payload) {
      window.localStorage.setItem("token", (data.payload as { token: string }).token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="login">
        <div className="rootslogin">
          <h5 className="title">Аккаунтқа кіру</h5>

          <input
            className={`field ${errors.email ? "error" : ""}`}
            type="email"
            placeholder="E-Mail"
            {...register("email", { required: "Email почтаңызды көрсетіңіз" })}
          />
          {errors.email && <p className="errorText">{errors.email.message}</p>}

          <input
            className={`field ${errors.password ? "error" : ""}`}
            type="password"
            placeholder="Құпия сөз"
            {...register("password", {
              required: "Құпия сөзді көрсетіңіз",
            })}
          />
          {errors.password && (
            <p className="errorText">{errors.password.message}</p>
          )}

          <button disabled={!isValid} type="submit" className="button">
            Кіру
          </button>

          <div className="links">
            <Link className="linkPage" to="/RegisterPage">
              Тіркелу
            </Link>
            <Link className="linkPage" to="/forgot-password">
              Құпия сөзді ұмыттыңыз ба?
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};
