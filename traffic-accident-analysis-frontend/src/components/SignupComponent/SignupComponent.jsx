import styles from "./SignupComponent.module.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import signupFormValidation from "./SignupComponentValidation";
import { useState } from "react";
import axiosConfig from "../../util/AxiosConfig/AxiosConfig";
import { ApiConstants } from "../../constants/ApiConstants";
import { PathConstants } from "../../constants/PathConstants";
import { parseErrorMessage } from "../../util/ErrorMessage/ErrorMessage";
import FormInput from "../Reusable/Input/FormInput";

const SignupComponent = () => {
  const [errorMessage, setErrorMessage] = useState([]);
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
      setErrorMessage(parseErrorMessage(error));
      setErrorFieldFocus(error.response.data.message);
    }
  };

  const setErrorFieldFocus = (errorMessage) => {
    if (errorMessage.includes("Username")) {
      document.getElementById("username").focus();
    } else if (errorMessage.includes("Email")) {
      document.getElementById("email").focus();
    } else if (errorMessage.includes("Password")) {
      document.getElementById("password").focus();
    } else if (errorMessage.includes("Passwords")) {
      document.getElementById("confirmPassword").focus();
    }
  };

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit(hanldeSignup)}>
        {errorMessage.map((data) => (
          <p
            key={data}
            className={
              errorMessage ? styles[("error", "signinError")] : styles.hidden
            }
          >
            {data}
          </p>
        ))}

        <FormInput
          id="username"
          icon={<i className="fa-solid fa-user"></i>}
          placeholder="Username"
          register={register("username")}
          errors={errors.username}
          styles={styles}
        />

        <FormInput
          id="email"
          icon={<i className="fa-solid fa-envelope"></i>}
          placeholder="Email"
          register={register("email")}
          errors={errors.email}
          styles={styles}
        />

        <FormInput
          type="password"
          id="password"
          icon={<i className="fa-solid fa-lock"></i>}
          placeholder="Password"
          register={register("password")}
          errors={errors.password}
          styles={styles}
        />

        <FormInput
          type="password"
          id="confirmPassword"
          icon={<i className="fa-solid fa-lock"></i>}
          placeholder="Confirm password"
          register={register("confirmPassword")}
          errors={errors.confirmPassword}
          styles={styles}
        />

        <button type="submit">Sign up</button>
        <p>
          Already have an account?{" "}
          <a onClick={() => navigator(PathConstants.SIGNIN)}>Sign in</a>
        </p>
      </form>
    </main>
  );
};

export default SignupComponent;
