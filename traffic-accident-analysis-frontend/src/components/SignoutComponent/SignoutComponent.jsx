import { useAuthentication } from "../Authentication/AuthenticationProvider"

const SignoutComponent = () => {
  const { signoutAction } = useAuthentication();  

  return (
    <div>
        <button onClick={() => signoutAction()}>Signout</button>
    </div>
  )
}

export default SignoutComponent