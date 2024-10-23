import styles from "./SignupComponent.module.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import signupFormValidation from "./SignupComponentValidation";
import { PathConstants } from "../../constants/PathConstants";
import FormInput from "../Reusable/Input/FormInput";
import SignupComponentUtil from "./SignupComponentUtil";
import PopupErrorMessages from "../PopupErrorMessages/PopupErrorMessages";

const SignupComponent = () => {
  const signupForm = signupFormValidation;
  const { errorMessages, hanldeSignup } = SignupComponentUtil();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupForm),
  });
  const navigator = useNavigate();

  return (
    <main className={styles.container}>
      { errorMessages !== undefined && <PopupErrorMessages errorMessages={errorMessages} /> }
      <form onSubmit={handleSubmit(hanldeSignup)} noValidate>
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
