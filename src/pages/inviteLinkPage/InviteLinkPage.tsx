
import SignUpForm from "../utilityComponents/forms/signupForm/SignupForm"
import { useParams } from "react-router-dom";
const InviteLinkPage = (): JSX.Element => {
    const params = useParams()
    const inviteId = params.id;
    return (
      <div className="invite-page-bg">
        <div className="signup-form-container">
          <SignUpForm inviteId={inviteId ? inviteId: ''} />
        </div>
      </div>
    );
}
export default InviteLinkPage