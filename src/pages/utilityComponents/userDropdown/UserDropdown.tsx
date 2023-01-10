import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowRightFromBracket,
  faBlackboard,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";
import useIsClickOutside from "../../../hooks/use-click-outside";
import ClampLines from "../clampLines/ClampLines";
interface UserDropdownItemType {
  children?: JSX.Element;
  icon?: IconProp;
  customIcon?: JSX.Element;
  onClick?: () => void;
}
interface UserDropdownProps {
  logOut: () => void;
  name?: string | undefined;
  email?: string | undefined;
  currentUser: Realm.User;
  userDropdownClass?: string;
  userModalClass?: string;
}
export const UserDropdownItem = ({
  children,
  icon,
  customIcon,
  onClick,
}: UserDropdownItemType): JSX.Element => {
  const allContent = (
    <>
      <div className="user-dropdown-modal-item-icon">
        {icon && <FontAwesomeIcon icon={icon} />}
        {customIcon}
      </div>
      <div className="user-dropdown-modal-content">{children}</div>
    </>
  );
  return (
    <>
      {onClick ? (
        <button
          className="user-dropdown-modal-item"
          onMouseDown={() => onClick()}
          onTouchStart={() => onClick()}
        >
          {allContent}
        </button>
      ) : (
        <div className="user-dropdown-modal-item">{allContent}</div>
      )}
    </>
  );
};
export const UserDropdownModal = ({
  email,
  name,
  logOut,
  currentUser,
  userModalClass,
}: Omit<UserDropdownProps, "userDropdownClass">): JSX.Element => {
  const navigate = useNavigate();
  return (
    
    <div
      className={`user-dropdown-modal ${userModalClass ? userModalClass : ""}`}
    >
      <UserDropdownItem
        customIcon={
          <Avatar
            name={name}
            className={"user-dropdown-avatar"}
            size={"1.5rem"}
            round={true}
            style={{ fontSize: "1.5rem" }}
          />
        }
      >
        <>{email && <ClampLines 
            id={email} 
            ellipsis = {"..."}
            buttons={false}
            text={email + "rigiroegmiogmeroig rgrg irej oireg r gire goeiog re ig"} 
            lines={1} 
        />}</>
      </UserDropdownItem>
      {currentUser.providerType !== "anon-user" && (
        <UserDropdownItem
          icon={faBlackboard}
          onClick={() => navigate(`/dashboard/${currentUser.id}`)}
        >
          <span>Dashboard</span>
        </UserDropdownItem>
      )}
      <UserDropdownItem icon={faArrowRightFromBracket} onClick={logOut}>
        <span>Log out</span>
      </UserDropdownItem>
    </div>
  );
};
const UserDropdown = ({
  logOut,
  name,
  email,
  currentUser,
  userDropdownClass,
  userModalClass,
}: UserDropdownProps): JSX.Element => {
  const { ref, isClickOutside, setisClickOutside } = useIsClickOutside(false);
  return (
    
    <div
      className={`user-dropdown-container ${
        userDropdownClass ? userDropdownClass : ""
      }`}
    >
      <button
        className={"user-dropdown-btn"}
        ref={ref}
        onClick={() => setisClickOutside((state) => !state)}
      >
        <Avatar
          name={name ? name : "Guest"}
          className={"user-dropdown-avatar"}
          size={"2rem"}
          textSizeRatio={2.5}
          round={true}
          style={{ cursor: "pointer" }}
        />
        <FontAwesomeIcon
          icon={faChevronDown}
          className={"user-dropdown-arrow-down"}
        />
      </button>
      {isClickOutside && (
        <UserDropdownModal
          currentUser={currentUser}
          name={name ? name : "Guest"}
          email={email ? email : "Guest"}
          logOut={logOut}
          userModalClass={userModalClass}
        />
      )}
    </div>
  );
};
export default UserDropdown;
