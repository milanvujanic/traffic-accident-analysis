import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types';
import { useAuthentication } from './AuthenticationProvider';

const PrivateRoute = ({ Component }) => {
  const { currentCsrfToken } = useAuthentication();

  if (!currentCsrfToken) {
    return <Navigate to="/" />;
  }

  return (
    <Component />
  )
}

PrivateRoute.propTypes = {
  Component: PropTypes.func.isRequired,
}

export default PrivateRoute;