import { useDispatch, batch } from "react-redux";

import PopUpBg from "../../../../utilityComponents/popUpBg/PopUpBg";
import { PopUpProps, GeneralDashboardPopUp } from "./general";
export const RevokeAccessPopUp = ({ user, index, closePopUp }: PopUpProps) => {
  const onRevokeAccess = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    const data = e.currentTarget.dataset;
    const actionType = data.actionType;
    switch (actionType) {
      case "close-modal":
        if (e.target === e.currentTarget) closePopUp(false);
        break;
      case "revoke-access":
        const userId = data.userId;
        const index = data.index;
        batch(() => {
          closePopUp(false);
        });
        break;
      default:
        break;
    }
  };
  const alertContent = (
    <>
      <p>
        Revoking access to this user will prevent them from uploading any new
        records. Already created records will remain in the archive.
      </p>
      <p>
        To add the user back, they must complete the sign up process again, or
        be invitied by an admin.
      </p>
    </>
  );
  return (
    <PopUpBg fullViewport={true} onClick={onRevokeAccess}>
      <GeneralDashboardPopUp
        onClick={onRevokeAccess}
        index={index}
        overallClassName={"revoke-access-pop-up"}
        heading={`Revoke ${user.first_name}'s Access`}
        btnActionType="revoke-access"
        btnText="Remove User"
        btnClass="revoke-user-access-btn"
        alertClass="revoke-access-alert"
        alertContent={alertContent}
      >
        <div></div>
      </GeneralDashboardPopUp>
    </PopUpBg>
  );
};
