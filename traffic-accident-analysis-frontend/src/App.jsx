import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/Authentication/PrivateRoute";
import AuthenticationProvider from "./components/Authentication/AuthenticationProvider";
import SigninComponent from "./components/SigninComponent/SigninComponent";
import SignupComponent from "./components/SignupComponent/SignupComponent";
import HomeComponent from "./components/HomeComponent/HomeComponent";
import SignoutComponent from "./components/SignoutComponent/SignoutComponent";
import { PathConstants } from "./constants/PathConstants";
import ForgotPasswordComponent from "./components/ForgotPasswordComponent/ForgotPasswordComponent";
import ForwardForgotPasswordRequestComponent from "./components/ForwardForgotPasswordRequestComponent/ForwardForgotPasswordRequestComponent";
import ResetPasswordComponent from "./components/ResetPasswordComponent/ResetPasswordComponent";

function App() {
  return (
    <Router>
      <AuthenticationProvider>
        <Routes>
          <Route path={PathConstants.SIGNIN} element={<SigninComponent />} />
          <Route path={PathConstants.SIGNUP} element={<SignupComponent />} />
          <Route path={PathConstants.FORGOT_PASSWORD} element={<ForgotPasswordComponent />} />
          <Route path={PathConstants.FORGOT_PASSWORD_FORWARD + "/:resetPasswordToken"} element={<ForwardForgotPasswordRequestComponent />} />
          <Route path={PathConstants.RESET_PASSWORD} element={<ResetPasswordComponent />} />
          <Route
            path={PathConstants.HOME}
            element={<PrivateRoute Component={HomeComponent} />}
          />
          <Route
            path={PathConstants.SIGNOUT}
            element={<PrivateRoute Component={SignoutComponent} />}
          />
        </Routes>
      </AuthenticationProvider>
    </Router>
  );
}

export default App;
