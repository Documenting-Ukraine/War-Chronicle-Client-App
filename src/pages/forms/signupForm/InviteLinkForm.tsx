
import SignUpForm from "./SignupForm"
import { useParams } from "react-router-dom";
const InviteLinkForm = (): JSX.Element => {
    const params = useParams()
    const inviteId = params.id;
    return (
        // <div className="signup-form-container">
          <SignUpForm inviteId={inviteId ? inviteId: ''} />
        //</div>
    );
}
export default InviteLinkForm