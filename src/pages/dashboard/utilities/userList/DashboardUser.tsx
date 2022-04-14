import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Avatar from "react-avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, batch } from "react-redux";
import useIsClickOutside from "../../../../hooks/use-click-outside";
import { UserDocument } from "../../../../types/dataTypes";
import UserActionsDropdown from "./DashboardUserDropdown";
import { useState } from "react";
import PopUpBg from "../../../utilityComponents/popUpBg/PopUpBg";
import { UserScopePopUp, RevokeAccessPopUp } from "./PopUpModals";
import {CategoriesList} from "../../../../types/dataTypes/CategoryIconMap"
const DashboardUser = ({
  user,
  elementType,
  index,
}: {
  user: UserDocument;
  elementType: "avatar" | "email" | "date" | "actionBtn";
  index: number;
}) => {
  const dispatch = useDispatch();
  const name = `${user.first_name} ${user.last_name}`;
  const [revokeAccess, setRevokeAccess] = useState(false);
  const [userScopeModal, setUserScopeModal] = useState(false);
  const [newCategories, setNewCategories] = useState<typeof CategoriesList[number][]>([]);
  const { ref, isClickOutside, setisClickOutside } = useIsClickOutside(false);
  const onEditUserScope = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
    newCategories?: typeof CategoriesList[number][]
  ) => {
    const data = e.currentTarget.dataset;
    const actionType = data.actionType;
    switch (actionType) {
      case "close-modal":
        setUserScopeModal(false);
        break;
      case "edit-scope":
        const userId = data.userId;
        const index = data.index;
        batch(() => {
          setUserScopeModal(false);
        });
        break;
      default:
        break;
    }
  };
  const onRevokeAccess = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
      const data = e.currentTarget.dataset;
      const actionType = data.actionType;
      switch (actionType) {
        case "close-modal":
          setRevokeAccess(false);
          break;
        case "revoke-access":
          const userId = data.userId;
          const index = data.index;
          batch(() => {
            setRevokeAccess(false);
          });
          break;
        default:
          break;
        }

  };
  const map = {
    avatar: (
      <div className="user-list-row-item">
        <Avatar
          name={name}
          className={"user-dropdown-avatar"}
          size={"2rem"}
          round={true}
          style={{ fontSize: "2rem" }}
        />
        <span className="user-list-name">{name}</span>
      </div>
    ),
    email: <div className="user-list-row-item">{`${user.email}`}</div>,
    date: (
      <div className="user-list-row-item">
        {user.creation_date.toLocaleDateString("en-us", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })}
      </div>
    ),
    actionBtn: (
      <div className="user-list-row-item user-actions">
        <button
          className="user-actions-btn"
          ref={ref}
          onClick={() => setisClickOutside((state) => !state)}
        >
          <FontAwesomeIcon icon={faEllipsis} />
        </button>
        {isClickOutside && (
          <UserActionsDropdown
            user={user}
            setRevokeAccess={setRevokeAccess}
            setUserScopeModal={setUserScopeModal}
          />
        )}
      </div>
    ),
  };
  return (
    <>
      {map[elementType]}
      {!userScopeModal && (
        <PopUpBg
          fullViewport={true}
          onClick={(e) => onEditUserScope(e, newCategories)}
        >
          <UserScopePopUp
            user={user}
            onClick={(e) => onEditUserScope(e, newCategories)}
            index={index}
          />
        </PopUpBg>
      )}
      {revokeAccess && (
        <PopUpBg fullViewport={true} onClick={onRevokeAccess}>
          <RevokeAccessPopUp
            user={user}
            onClick={onRevokeAccess}
            index={index}
          />
        </PopUpBg>
      )}
    </>
  );
};

export default DashboardUser;
