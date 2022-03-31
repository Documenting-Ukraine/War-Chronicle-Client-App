import { useState } from "react"
import { User } from "realm-web";
import useLoginError from "../../../../hooks/use-login-error"
import { useRealmApp } from "../../../../realm/RealmApp";
import guestLogin from "../../../../realm/auth/guestAuth"
interface GuestFormProps {
    setGuestLogin: (e: false) => void,
    onSignInSuccess: (e: User) => void
}
const GuestForm = ({
    setGuestLogin,
    onSignInSuccess
}: GuestFormProps): JSX.Element => {
    const [purpose, setPurpose] = useState("")
    const [organization, setOrganization] = useState({ selected: false, orgName: "" })
    const [occupation, setOccupation] = useState("")
    const app = useRealmApp()
    const [signInErr, onSignInError] = useLoginError({
        loginType: "guestLogin"
    });
    const customData = {
        purpose: purpose,
        organization: organization,
        occupation: occupation
    }
    return (
        <div className="login-guest-form">
            <button
                aria-label = "return to first login page"
                onClick={()=>setGuestLogin(false)}
            >
                
            </button>
            <form className="">
                
                <button
                    onClick={() => guestLogin({
                        app: app, 
                        customErrorFunc: onSignInError,
                        customSuccessCallback: onSignInSuccess,
                        customData: customData
                    })}
                >
                    Start Exploring !
                </button>
            </form>
      </div>
    );
}
export default GuestForm