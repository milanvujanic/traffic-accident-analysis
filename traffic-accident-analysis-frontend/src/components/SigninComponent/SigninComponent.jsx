import styles from "./SigninComponent.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import signinFormValidation from "./SigninComponentValidation";
import { useAuthentication } from "../Authentication/AuthenticationProvider";
import { PathConstants } from "../../constants/PathConstants";
import FormInput from "../Reusable/Input/FormInput";
import PopupSuccessMessages from "../PopupSuccessMessages/PopupSuccessMessages";
import PopupErrorMessages from "../PopupErrorMessages/PopupErrorMessages";

const SigninComponent = () => {
  const { signinAction, errorMessages } = useAuthentication();
  const signinForm = signinFormValidation;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signinForm),
  });

  const navigator = useNavigate();
  const { state } = useLocation();

  return (
    <main className={styles.container}>
      { state && <PopupSuccessMessages successMessage={state.successMessage} /> }
      { errorMessages !== undefined && <PopupErrorMessages errorMessages={errorMessages} /> }
      <form onSubmit={handleSubmit(signinAction)} noValidate>
        {errorMessages.forEach((messages, property) => (
          <p
            key={property}
            className={
              messages.length > 0
                ? styles[("error", "signinError")]
                : styles.hidden
            }
          >
            {messages}
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
          type="password"
          id="password"
          icon={<i className="fa-solid fa-lock"></i>}
          placeholder="Password"
          register={register("password")}
          errors={errors.password}
          styles={styles}
        />

        <button type="submit">Sign in</button>
        <p>
          Don&apos;t have an account?{" "}
          <a onClick={() => navigator(PathConstants.SIGNUP)}>Sign up</a>
        </p>
        <p className={styles.forgotPassword}>
          <a onClick={() => navigator(PathConstants.FORGOT_PASSWORD)}>Forgot password?</a>
        </p>
      </form>
    </main>
  );
};

export default SigninComponent;
