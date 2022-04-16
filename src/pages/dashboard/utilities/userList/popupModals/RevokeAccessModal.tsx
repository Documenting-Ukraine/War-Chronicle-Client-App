import { useDispatch, batch } from "react-redux";
import useWindowWidth from "../../../../../hooks/use-window-width"
import PopUpBg from "../../../../utilityComponents/popUpBg/PopUpBg";
import { PopUpProps, GeneralDashboardPopUp } from "./general";
export const RevokeAccessPopUp = ({ user, index, closePopUp }: PopUpProps) => {
      const mediumWidth = useWindowWidth(992);
  const onRevokeAccess = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    const data = e.currentTarget.dataset;
    const actionType = data.actionType;
    switch (actionType) {
      case "close-pop-up":
        if (e.target === e.currentTarget) closePopUp(false);
        if (
          (e.target instanceof HTMLElement || e.target instanceof SVGElement) &&
          e.target.closest("button")?.dataset.actionType
        )
          closePopUp(false);
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
        <>
          <h3 className="revoke-user-title">Remove the following contributor?</h3>
          <div className="revoke-user-list-heading">
            <h4>Name</h4>
            <h4>Email</h4>
            {mediumWidth && <h4>Joined</h4>}
          </div>
          <div className="revoke-user-list-item">
            <p>{user.first_name + " " + user.last_name}</p>
            <p>{user.email}</p>
            {mediumWidth && <p>
              {new Date(user.creation_date).toLocaleDateString("en-us", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </p>}
          </div>
        </>
      </GeneralDashboardPopUp>
    </PopUpBg>
  );
};
