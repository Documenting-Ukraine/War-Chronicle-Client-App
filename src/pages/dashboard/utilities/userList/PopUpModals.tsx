import { UserDocument } from "../../../../types/dataTypes";
import ExitIcon from "../../../utilityComponents/exitIcon/ExitIcon";
interface PopUpProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  onCategoryUpdate?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => void;
  user: UserDocument;
  index: number;
}
const RevokeAccessPopUp = ({ onClick, user }: PopUpProps) => {
  return (
    <div className="dashboard-popup-modal revoke-access-pop-up">
      <div></div>
    </div>
  );
};
const UserScopePopUp = ({
  onClick,
  user,
  index,
  onCategoryUpdate,
}: PopUpProps) => {
  return (
    <div className="dashboard-popup-modal edit-user-scope-popup">
      <div className="edit-user-scope-header">
        <h2>{`Edit ${user.first_name}'s Categories`}</h2>
        <button data-action-type="close-modal" onClick={onClick}>
          {<ExitIcon customStrokeWidth={"0.4rem"} />}
        </button>
      </div>
      <div className="edit-user-scope-body">
        <button data-action-type={""} data-index={index} onClick={onClick}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export { RevokeAccessPopUp, UserScopePopUp };
