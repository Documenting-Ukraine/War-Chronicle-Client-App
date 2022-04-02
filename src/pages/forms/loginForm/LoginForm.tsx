import GuestForm from "./pages/GuestForm"
import MainLoginForm from "./pages/MainLoginForm";
import { useNavigate } from "react-router-dom"
import { CSSTransition } from "react-transition-group";
import { User } from "realm-web"
import { useState } from "react"
import useLoginError from "../../../hooks/use-login-error";
const timeout = 300
const LoginForm = (): JSX.Element => {
    const navigate = useNavigate()
    const [signInErr, onSignInError] = useLoginError({ loginType: "googleLogin" }) 
    const [guestLogin, setGuestLogin] = useState(false)
    const onSignInSuccess = (user: User) => {
      if(!guestLogin) navigate(`/dashboard/${user.id}`);
      else navigate('/search')  
    };
  return (
    <>
      <CSSTransition
        in={!guestLogin}
        timeout={timeout}
        classNames="login-form-pg"
        unmountOnExit
      >
        <div className="login-transition-container">
          <MainLoginForm
            signInErr={signInErr}
            setGuestLogin={setGuestLogin}
            onSignInSuccess={onSignInSuccess}
            onSignInError={onSignInError}
          />
        </div>
      </CSSTransition>
      <CSSTransition
        unmountOnExit
        in={guestLogin}
        timeout={timeout}
        classNames="guest-form-pg"
      >
        <div className="login-transition-container">
          <GuestForm
            setGuestLogin={setGuestLogin}
            onSignInSuccess={onSignInSuccess}
          />
        </div>
      </CSSTransition>
    </>
  );
}
export default LoginForm