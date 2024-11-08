import styles from "./ResetPasswordComponent.module.css";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import resetPasswordFormValidation from "./ResetPasswordComponentValidation"
import FormInput from "../Reusable/Input/FormInput";
import PopupErrorMessages from "../PopupErrorMessages/PopupErrorMessages";
import ResetPasswordComponentUtil from "./ResetPasswordComponentUtil";

const ResetPasswordComponent = () => {
  const resetPasswordForm = resetPasswordFormValidation;
  const { state } = useLocation();
  const { errorMessages, hanldeResetPassword } = ResetPasswordComponentUtil(state);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordForm),
  });

  return (
    <main className={styles.container}>
      { errorMessages !== undefined && <PopupErrorMessages errorMessages={errorMessages} /> }
      <form onSubmit={handleSubmit(hanldeResetPassword)} noValidate>
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
        <button type="submit">Reset Password</button>
      </form>
    </main>
  );
};

export default ResetPasswordComponent;
