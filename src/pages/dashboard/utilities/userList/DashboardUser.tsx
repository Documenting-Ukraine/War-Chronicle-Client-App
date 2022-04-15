import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Avatar from "react-avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useIsClickOutside from "../../../../hooks/use-click-outside";
import { UserDocument } from "../../../../types/dataTypes";
import UserActionsDropdown from "./DashboardUserDropdown";
import { useState } from "react";
import { RevokeAccessPopUp } from "./popupModals/RevokeAccessModal";
import { UserScopePopUp } from "./popupModals/UserCategoryModal";
const DashboardUser = ({
  user,
  elementType,
  index,
}: {
  user: UserDocument;
  elementType: "avatar" | "email" | "date" | "actionBtn";
  index: number;
}) => {
  const name = `${user.first_name} ${user.last_name}`;
  const [revokeAccess, setRevokeAccess] = useState(false);
  const [userScopeModal, setUserScopeModal] = useState(false);
  const { ref, isClickOutside, setisClickOutside } = useIsClickOutside(false);
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
      {userScopeModal && (
          <UserScopePopUp
            user={user}
          index={index}
          closePopUp={setUserScopeModal}
          />
      )}
      {revokeAccess && (
          <RevokeAccessPopUp
            user={user}
           index={index}
            closePopUp={setRevokeAccess}
          />
      )}
    </>
  );
};

export default DashboardUser;
