import styles from './SigninComponent.module.css'
import axios from 'axios';
import { json, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import signinFormValidation from './SigninComponentValidation';
import { useState } from 'react'

const SigninComponent = () => {
  
  const [user, setUser] = useState({});
  const [csrfToken, setCsrfToken] = useState(localStorage.getItem("csrf_token") || "");
  const [errorData, setErrorData] = useState({});
  const signinForm = signinFormValidation;

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signinForm),
  });
  
  const navigator = useNavigate();

  // const onSubmit = async (data) => {
  //   try {
  //     const response = await axios
  //       .post("http://localhost:8080/api/auth/signin", 
  //         {
  //           username: data.username,
  //           password: data.password,
  //         },
  //       );
        
  //       console.log(response.headers.csrf_token);

  //     navigator("/signup");
  //   } catch (error) {
  //     setErrorData(error.response.data);
  //   }
  // }

  const onSubmit = async (data) => {
    let response;
    try {
      response = await axios
        .post("http://localhost:8080/api/auth/signin", 
          {
            username: data.username,
            password: data.password,
          }
        );
    } catch (error) {
      setErrorData(error.response.data);
    }

    if (response.data) {
      setUser(response.data);
      console.log(user);
      localStorage.setItem("csrf_token", response.headers.csrf_token);
      navigator("/signup");
      return;
    }
};

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <p className={errorData.message ? styles["error", "signinError"]: styles.hidden}>{errorData.message}</p>
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