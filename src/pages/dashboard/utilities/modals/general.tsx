import { UserDocument } from "../../../../types/dataTypes";
import ExitIcon from "../../../utilityComponents/exitIcon/ExitIcon";

export interface PopUpProps {
  closePopUp: React.Dispatch<React.SetStateAction<boolean>>;
  user: Omit<UserDocument, "external_id" | "user_id">;
  index: number;
}
export type GeneralPopUpProps = Omit<PopUpProps, "user" | "closePopUp"> & {
  onClick: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  overallClassName?: string;
  heading?: string;
  btnActionType: "save-scope" | "revoke-access" | "request-access" | "add-user";
  btnText: "Save Changes" | "Remove User" | "Submit" | "Send Invite";
  children?: JSX.Element;
  btnClass: string;
  alertClass: string;
  alertContent: string | JSX.Element;
};
export const GeneralDashboardPopUp = ({
  onClick,
  overallClassName,
  heading,
  btnClass,
  btnActionType,
  btnText,
  children,
  alertClass,
  alertContent,
}: GeneralPopUpProps) => {
  return (
    <div
      className={`dashboard-popup-modal ${
        overallClassName ? overallClassName : ""
      }`}
    >
      <div className="dashboard-popup-modal-header">
        <h2>{heading ? heading : ""}</h2>
        <button data-action-type="close-pop-up" onClick={onClick}>
          {<ExitIcon customStrokeWidth={"0.4rem"} />}
        </button>
      </div>
      <div className="dashboard-popup-modal-body">
        <div className={`popup-modal-alert ${alertClass}`}>{alertContent}</div>
        {children}
        <button
          data-action-type={btnActionType}
          onClick={onClick}
          className={`dashboard-popup-modal-submit-btn ${btnClass ? btnClass : ''}`}
          type="submit"
        >
          {btnText}
        </button>
      </div>
    </div>
  );
};
