import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/Authentication/PrivateRoute";
import AuthenticationProvider from "./components/Authentication/AuthenticationProvider";
import SigninComponent from "./components/SigninComponent/SigninComponent";
import SignupComponent from "./components/SignupComponent/SignupComponent";
import HomeComponent from "./components/HomeComponent/HomeComponent";
import SignoutComponent from "./components/SignoutComponent/SignoutComponent";
import { PathConstants } from "./constants/PathConstants";

function App() {
  return (
    <Router>
      <AuthenticationProvider>
        <Routes>
          <Route path={PathConstants.SIGNIN} element={<SigninComponent />} />
          <Route path={PathConstants.SIGNUP} element={<SignupComponent />} />
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
