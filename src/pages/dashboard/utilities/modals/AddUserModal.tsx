import validEmail from "../../../../helperFunctions/validateEmail";
import { useRealmApp } from "../../../../realm/RealmApp";
import { GeneralDashboardPopUp } from "./general";
import PopUpBg from "../../../utilityComponents/popUpBg/PopUpBg";
import removeAddedWhiteSpace from "../../../../helperFunctions/removeWhiteSpace";
import { useEffect, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import LoadingIcon from "../../../../pages/utilityComponents/loadingIcon/LoadingIcon";
import FormInputs, {
  CustomFormInputs,
  customStylesErr,
} from "../../../utilityComponents/formInputs/FormInputs";
import { categoryDropdownOptions } from "../../../../types/dataTypes/CategoryIconMap";
import Select from "react-select";
import useFormInputs from "../../../../hooks/use-form-inputs";
import { isOption, Option } from "../../../authPage/data/OccupationList";
import { sub } from "date-fns";

interface NewInviteLinkPayload {
  category_scopes: string[];
  email: string;
  account_type: "admin" | "contributor";
}
const AddUserModal = ({
  closePopUp,
}: {
  closePopUp: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const app = useRealmApp();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setError] = useState({ err: true, message: "" });
  const [accountType, setAccountType] = useState<"admin" | "contributor">(
    "contributor"
  );
  const [assignedScopes, setAssginedScopes] = useState<Option[]>([]);
  const [submitted, setSubmitted] = useState<false | NewInviteLinkPayload[]>(
    false
  );

  useEffect(() => {
    //reset multi values
    if (accountType === "admin") setAssginedScopes([]);
  }, [accountType]);
  const onClosePopUp = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
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
        break;
    }
  };
  const onSendUserInvite = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries());
    const email = removeAddedWhiteSpace(
      fieldValues["New User Gmail"].toString()
    );
    const submitAccountType = removeAddedWhiteSpace(
      fieldValues["Account Type"].toString()
    );
    if (!validEmail(email)) return;
    if (submitAccountType !== "admin" && submitAccountType !== "contributor")
      return;
    const payload: { users: NewInviteLinkPayload[] } = {
      users: [
        {
          email: email,
          category_scopes: assignedScopes.map((option) => option.value),
          account_type: submitAccountType,
        },
      ],
    };
    try {
      setIsLoading(true);
      await app.currentUser?.callFunction("create_invite_link", payload);
      unstable_batchedUpdates(() => {
        setIsLoading(false);
        setError({
          err: false,
          message: "",
        });
        setSubmitted((state) => {
          if (state) return [...state, ...payload.users];
          else return payload.users;
        });
      });
    } catch (e) {
      console.error(e);
      unstable_batchedUpdates(() => {
        setIsLoading(false);
        setError({
          err: true,
          message: `Something went wrong. We could not process your request. Please try again in a few minutes, or contact ${process.env.REACT_APP_SUPPORT_EMAIL}`,
        });
      });
    }
  };
  const alertContent = (
    <>
      <p>
        The e-mail address this invite is sent to, must be used to register the
        user. Any other e-mail addresses will be rejected. This allows only
        authorized e-mails to use the invite link.
      </p>
      <p>
        It may take up to 5-10 minutes for the user to recieve their invitation.
        If not, please have the user check their spam folder.
      </p>
    </>
  );
  const accountTypeOptions: Option[] = [
    { label: "Admin", value: "admin" },
    { label: "Contributor", value: "contributor" },
  ];
  return (
    <>
      <PopUpBg fullViewport={true} onClick={onClosePopUp}>
        <form onSubmit={onSendUserInvite}>
          <GeneralDashboardPopUp
            index={0}
            onClick={onClosePopUp}
            overallClassName={"add-user-pop-up"}
            heading={`Invite New User`}
            btnActionType="add-user"
            btnText="Send Invite"
            btnClass="send-user-invite-access-btn"
            alertClass="add-user-alert"
            alertContent={alertContent}
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
              <FormInputs name="New User Gmail" />
              <FormInputs
                name="Account Type"
                dropDown={accountTypeOptions}
                className="request-form-dropdown"
                defaultDropDownValue={accountTypeOptions[1]}
                customDropdownFunc={(e) => {
                  if (
                    isOption(e) &&
                    (e.value === "admin" || e.value === "contributor")
                  )
                    setAccountType(e.value);
                }}
                required
              />
              {accountType !== "admin" && (
                <FormInputs
                  dropDown={categoryDropdownOptions(null)}
                  name={"Assign Category Scopes"}
                  isDropdownMulti
                  className={"request-form-dropdown"}
                  customDropdownFunc={(e) => {
                    if (!isOption(e) && e) setAssginedScopes([...e]);
                  }}
                  required
                />
              )}
            </>
          </GeneralDashboardPopUp>
        </form>
      </PopUpBg>
    </>
  );
};
export default AddUserModal;
