import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../Authentication/AuthenticationProvider"

const SignoutComponent = () => {
  const { signoutAction } = useAuthentication();  
  const navigate = useNavigate();

  return (
    <div>
        <button onClick={() => signoutAction()}>Signout</button>
        <button onClick={() => navigate("/home")}>Go to signout...</button>
    </div>
  )
}

export default SignoutComponent