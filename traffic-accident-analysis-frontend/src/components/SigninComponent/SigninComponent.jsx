import styles from './SigninComponent.module.css'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import signinFormValidation from './SigninComponentValidation';
import { useAuthentication } from '../Authentication/AuthenticationProvider';

const SigninComponent = () => {
  const { signinAction, currentErrorData } = useAuthentication();
  const signinForm = signinFormValidation;

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signinForm),
  });
  
  const navigator = useNavigate();

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit(signinAction)} noValidate>
        <p className={currentErrorData.message ? styles["error", "signinError"]: styles.hidden}>{currentErrorData.message}</p>
        <div className={styles.formControl}>
          <div className={styles.formData}>
            <label htmlFor="username">
              <i className="fa-solid fa-user"></i>
            </label>
            <input type="text" id="username" placeholder="Username" {...register("username")} />
          </div>
          <p className={errors.username ? styles.error : styles.hidden}>* {errors.username?.message}</p>
        </div>
        
        <div className={styles.formControl}>
          <div className={styles.formData}>
            <label htmlFor="password">
              <i className="fa-solid fa-lock"></i>
            </label>
            <input type="password" id="password" placeholder="Password" {...register("password")} />
          </div>
          <p className={errors.password ? styles.error : styles.hidden}>* {errors.password?.message}</p>
        </div>

        <button type="submit">Sign in</button>
        <p>Don&apos;t have an account? <a onClick={() => navigator("/signup")}>Sign up</a></p>
      </form>
    </main>
  )
}

export default SigninComponent