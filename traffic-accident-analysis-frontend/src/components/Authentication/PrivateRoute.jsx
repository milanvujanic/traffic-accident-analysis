import { useAuthentication } from './AuthenticationProvider'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types';

const PrivateRoute = ({ Component }) => {
  const { csrf_token } = useAuthentication();

  if (!csrf_token.current) {
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