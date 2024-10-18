import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuthentication } from "./AuthenticationProvider";
import { PathConstants } from "../../constants/PathConstants";

const PrivateRoute = ({ Component }) => {
  const { csrfToken } = useAuthentication();

  if (!csrfToken) {
    return <Navigate to={PathConstants.SIGNIN} />;
  }

  return <Component />;
};

PrivateRoute.propTypes = {
  Component: PropTypes.func.isRequired,
};

export default PrivateRoute;
