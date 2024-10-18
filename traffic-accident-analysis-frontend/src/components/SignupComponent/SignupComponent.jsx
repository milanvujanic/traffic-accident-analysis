import styles from "./SignupComponent.module.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import signupFormValidation from "./SignupComponentValidation";
import { useState } from "react";
import axiosConfig from "../../util/AxiosConfig/AxiosConfig";
import { ApiConstants } from "../../constants/ApiConstants";
import { PathConstants } from "../../constants/PathConstants";

const SignupComponent = () => {
  const [errorData, setErrorData] = useState({});
  const signupForm = signupFormValidation;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupForm),
  });

  const navigator = useNavigate();

  const hanldeSignup = async (data) => {
    try {
      await axiosConfig.post(ApiConstants.SIGNUP, {
        username: data.username,
        email: data.email,
        password: data.password,
        roles: [],
      });

      navigator(PathConstants.SIGNIN);
    } catch (error) {
      setErrorData(error.response.data);
      setErrorFieldFocus(error.response.data.message);
    }
  };

  const setErrorFieldFocus = (errorMessage) => {
    if (errorMessage.includes("Username")) {
      document.getElementById("username").focus();
    } else if (errorMessage.includes("Email")) {
      document.getElementById("email").focus();
    }
  };

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit(hanldeSignup)}>
        <p
          className={
            errorData.message ? styles[("error", "signinError")] : styles.hidden
          }
        >
          {errorData.message}
        </p>
        <div className={styles.formControl}>
          <div className={styles.formData}>
            <label htmlFor="username">
              <i className="fa-solid fa-user"></i>
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              {...register("username")}
            />
          </div>
          <p className={errors.username ? styles.error : styles.hidden}>
            * {errors.username?.message}
          </p>
        </div>

        <div className={styles.formControl}>
          <div className={styles.formData}>
            <label htmlFor="email">
              <i className="fa-solid fa-envelope"></i>
            </label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              {...register("email")}
            />
          </div>
          <p className={errors.email ? styles.error : styles.hidden}>
            * {errors.email?.message}
          </p>
        </div>

        <div className={styles.formControl}>
          <div className={styles.formData}>
            <label htmlFor="password">
              <i className="fa-solid fa-lock"></i>
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              {...register("password")}
            />
          </div>
          <p className={errors.password ? styles.error : styles.hidden}>
            * {errors.password?.message}
          </p>
        </div>

        <div className={styles.formControl}>
          <div className={styles.formData}>
            <label htmlFor="confirmPassword">
              <i className="fa-solid fa-lock"></i>
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm password"
              {...register("confirmPassword")}
            />
          </div>
          <p className={errors.confirmPassword ? styles.error : styles.hidden}>
            * {errors.confirmPassword?.message}
          </p>
        </div>

        <button type="submit">Sign up</button>
        <p>
          Already have an account? <a onClick={() => navigator(PathConstants.SIGNIN)}>Sign in</a>
        </p>
      </form>
    </main>
  );
};

export default SignupComponent;
