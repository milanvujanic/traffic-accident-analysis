import styles from "./SigninComponent.module.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import signinFormValidation from "./SigninComponentValidation";
import { useAuthentication } from "../Authentication/AuthenticationProvider";
import { PathConstants } from "../../constants/PathConstants";
import FormInput from "../Reusable/Input/FormInput";

const SigninComponent = () => {
  const { signinAction, errorMessage } = useAuthentication();
  const signinForm = signinFormValidation;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signinForm),
  });

  const navigator = useNavigate();

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit(signinAction)} noValidate>
        {errorMessage.map((data) => (
          <p
            key={data}
            className={
              errorMessage ? styles[("error", "signinError")] : styles.hidden
            }
          >
            {errorMessage}
          </p>
        ))}

        <FormInput
          id="username"
          icon={<i className="fa-solid fa-user"></i>}
          placeholder="Username"
          register={register("username")}
          errors={errors.username}
          styles={{...styles}}
        />

        <FormInput
          type="password"
          id="password"
          icon={<i className="fa-solid fa-lock"></i>}
          placeholder="Password"
          register={register("password")}
          errors={errors.password}
          styles={{...styles}}
        />

        <button type="submit">Sign in</button>
        <p>
          Don&apos;t have an account?{" "}
          <a onClick={() => navigator(PathConstants.SIGNUP)}>Sign up</a>
        </p>
      </form>
    </main>
  );
};

export default SigninComponent;
