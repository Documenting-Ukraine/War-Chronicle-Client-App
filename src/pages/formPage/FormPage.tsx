
import LoginForm from "../forms/loginForm/LoginForm"
import RequestAccessForm from "../forms/requestAccessForm/RequestAccessForm";
import InviteLinkForm from "../forms/signupForm/InviteLinkForm";
const FormPageWrapper = ({ children }: { children: JSX.Element }) => {
    return (
      <div className="form-pg-container">
        <div
          style={{ overflow: "hidden", position: "relative", display: "flex" }}
        >
          <div className="form-overall-container">{children}</div>
        </div>
      </div>
    );
}
const FormPage = ({
    formType
}: {
    formType: "login" | "invite-links" | "join"
}): JSX.Element => {
    return (
      <>
        {formType === "login" ? (
          <FormPageWrapper>
            <LoginForm />
          </FormPageWrapper>
        ) : formType === "invite-links" ? (
          <FormPageWrapper><InviteLinkForm /></FormPageWrapper>
        ) : formType === "join" ? (
          <FormPageWrapper><RequestAccessForm /></FormPageWrapper>
        ) : null}
      </>
    );
}
export default FormPage