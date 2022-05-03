import PopUpBg from "../../../utilityComponents/popUpBg/PopUpBg";
import { GeneralDashboardPopUp, PopUpProps } from "./general";
import RequestAccessInput from "../../../forms/requestAccessForm/RequestAccessInput";
import { categoryDropdownOptions } from "../../../../types/dataTypes/CategoryIconMap";
import { useRealmApp } from "../../../../realm/RealmApp";
import { isUserCustomData } from "../../../../types/dataTypes";
import { ObjectId } from "mongodb";
import { unstable_batchedUpdates } from "react-dom";
import { useState } from "react";
import LoadingIcon from "../../../../pages/utilityComponents/loadingIcon/LoadingIcon";
type RequestNewScopesProps = Omit<PopUpProps, "user" | "index">;
interface RequestScopeResult {
  error: null;
  upsertedId: ObjectId | string;
}
interface RequestScopeErr {
  error: true;
  message: "Request Already Exists" | "Category Present";
}
function isRequestScopeResult(arg: any): arg is RequestScopeResult {
  return !arg.error && arg.upsertedId;
}
function isRequestScopeError(arg: any): arg is RequestScopeErr {
  return arg.error && arg.message;
}
const RequestNewScopesModal = ({ closePopUp }: RequestNewScopesProps) => {
  const app = useRealmApp();
  const userData = { ...app.currentUser?.customData };
  const [isSubmitted, setIsSubmitted] = useState({
    submitted: false,
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState({
    err: false,
    message: "",
  });
  const onRequestAccess = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>
  ) => {
    const data = e.currentTarget.dataset;
    const actionType = data.actionType;
    switch (actionType) {
      case "close-pop-up":
        if (e.target === e.currentTarget) closePopUp(false);
        if (
          (e.target instanceof HTMLElement || e.target instanceof SVGElement) &&
          e.target.closest("button")?.dataset.actionType === "close-pop-up"
        )
          closePopUp(false);
        break;
      default:
        return;
    }
  };
  const alertContent = (
    <>
      <p>
        To request access to a new category, you must submit the form below. You
        can only submit requests for one category at a time.
      </p>
      <p>
        After submitting, please wait for admin approval. Once an admin has
        approved your request, you will be able to add records to the new
        category.
      </p>
    </>
  );
  const categoriesListOptions = categoryDropdownOptions(app.currentUser)
  const onRequestAccessSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries());
    const purpose = fieldValues["Why do you want to access this category?"].toString();
    const category = fieldValues["Select Category Scope"].toString();

    if (!isUserCustomData(userData)) return;
    const payload = {
      user_id: userData._id.toString(),
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      purpose: purpose,
      category: category,
    };
    try {
      setIsLoading(true);
      const result = await app.currentUser?.callFunction(
        "create_scope_request",
        payload
      );
      if (isRequestScopeError(result)) {
        unstable_batchedUpdates(() => {
          setIsLoading(false);
          setErr({
            err: true,
            message:
              result.message === "Request Already Exists"
                ? "You have already submitted a request for this category. Please wait for approval"
                : "You already have access to this category",
          });
        });
      } else if (!isRequestScopeResult(result))
        throw new Error("Something went wrong");
      else {
        //only if successfull
        unstable_batchedUpdates(() => {
          setIsLoading(false);
          setIsSubmitted({
            submitted: true,
            message: `Your request to add '${category}' to your list of categories has been recieved. Please wait for an admin to contact you, about your approval.`,
          });
          setErr({
            err: false,
            message: "",
          });
        });
      }
    } catch (e) {
      unstable_batchedUpdates(() => {
        setIsLoading(false);
        setErr({
          err: true,
          message: `Something went wrong. We could not process your request. Please try again in a few minutes, or contact ${process.env.REACT_APP_SUPPORT_EMAIL}`,
        });
      });
    }
  };
  return (
    <PopUpBg fullViewport={true} onClick={onRequestAccess}>
      <>
        {!isSubmitted.submitted && (
          <form onSubmit={onRequestAccessSubmit}>
            <GeneralDashboardPopUp
              onClick={onRequestAccess}
              overallClassName={"request-new-scope-pop-up"}
              heading={`Request New Scope`}
              btnActionType="request-access"
              btnText="Submit"
              btnClass="request-scope-btn"
              alertClass="request-scope-alert"
              alertContent={alertContent}
              index={0}
            >
              <>
                {err.err && (
                  <div className="request-scope-pop-up-err">{err.message}</div>
                )}
                {isLoading && (
                  <div className="request-scope-pop-up-loading">
                    <LoadingIcon strokeWidth={"0.2rem"} />
                  </div>
                )}
                <div className="top-spacing"></div>
                <RequestAccessInput
                  name="Select Category Scope"
                  dropDown={categoriesListOptions}
                />
                <RequestAccessInput
                  name="Why do you want to access this category?"
                  textArea={true}
                  required={false}
                />
              </>
            </GeneralDashboardPopUp>
          </form>
        )}
        {isSubmitted.submitted && (
          <div className="request-scope-pop-up-submitted">
            {isSubmitted.message}
          </div>
        )}
      </>
    </PopUpBg>
  );
};
export default RequestNewScopesModal;
