import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/router";
import { AUTH_PATH } from "../settings/api";
import Image from "next/image";

const schema = yup.object().shape({
  identifier: yup.string().required("Please enter your username"),

  password: yup.string().required("Please enter your password"),
});

const LoginForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [, setAuth] = useContext(AuthContext);
  const router = useRouter();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    setLoginError(null);

    try {
      const response = await axios.post(`${AUTH_PATH}`, data);
      setAuth(response.data);
      router.push("/admin");
    } catch (error) {
      console.log("error", error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      {loginError && (
        <div className="login-form__login-error">
          <h3>Failed to login</h3>
          <p className="login-form__login-error-message">{loginError}</p>
        </div>
      )}
      <fieldset className="login-form__fieldset" disabled={submitting}>
        <div className="login-form__group">
          <div className="login-form__icon">
            <Image
              src="/login-user.svg"
              width="40"
              height="40"
              alt="user icon"
            />
          </div>
          <input
            className="login-form__input"
            type="text"
            placeholder="Username"
            ref={register}
            name="identifier"
          />
        </div>
        {errors.identifier && (
          <p className="login-form__error">{errors.identifier.message}</p>
        )}
        <div className="login-form__group">
          <div className="login-form__icon">
            <Image src="/lock.svg" width="40" height="40" alt="lock icon" />
          </div>
          <input
            className="login-form__input"
            type="password"
            placeholder="Password"
            ref={register}
            name="password"
          />
        </div>
        {errors.password && (
          <p className="login-form__error">{errors.password.message}</p>
        )}
        <div className="login-form__group login-form__group--btn">
          <button className="login-form__submit" type="submit">
            {submitting ? "Loggin in..." : "Login"}
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default LoginForm;
