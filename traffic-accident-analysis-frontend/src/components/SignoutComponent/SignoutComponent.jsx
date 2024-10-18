import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../Authentication/AuthenticationProvider";
import { PathConstants } from "../../constants/PathConstants";

const SignoutComponent = () => {
  const { signoutAction } = useAuthentication();
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => signoutAction()}>Signout</button>
      <button onClick={() => navigate(PathConstants.HOME)}>Go to signout...</button>
    </div>
  );
};

export default SignoutComponent;
