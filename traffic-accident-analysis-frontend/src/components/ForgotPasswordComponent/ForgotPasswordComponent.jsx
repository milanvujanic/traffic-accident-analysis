import styles from "./ForgotPasswordComponent.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import forgotPasswordValidation from "./ForgotPasswordComponentValidation";
import FormInput from "../Reusable/Input/FormInput";
import ForgotPasswordComponentUtil from "./ForgotPasswordComponentUtil";
import PopupErrorMessages from "../PopupErrorMessages/PopupErrorMessages";
import PopupSuccessMessages from "../PopupSuccessMessages/PopupSuccessMessages";

const ForgotPasswordComponent = () => {
  const [
    successMessages,
    setSuccessMessages,
    errorMessages,
    hanldeForgotPassword,
  ] = ForgotPasswordComponentUtil();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordValidation),
  });

  return (
    <main className={styles.container}>
      {
        <PopupSuccessMessages
          successMessages={successMessages}
          setSuccessMessages={setSuccessMessages}
        />
      }
      {errorMessages !== undefined && (
        <PopupErrorMessages errorMessages={errorMessages} />
      )}
      <form onSubmit={handleSubmit(hanldeForgotPassword)} noValidate>
        <FormInput
          id="email"
          icon={<i className="fa-solid fa-envelope"></i>}
          placeholder="Email"
          register={register("email")}
          errors={errors.email}
          styles={styles}
        />
        <button type="submit">Proceed</button>
      </form>
    </main>
  );
};

export default ForgotPasswordComponent;
