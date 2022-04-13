import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Avatar, {ConfigProvider} from "react-avatar";
import { UserDocument } from "../../../../store/reducers/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashboardUser = ({
  user,
  elementType,
}: {
  user: UserDocument;
  elementType: "avatar" | "email" | "date" | "actionBtn";
}) => {
  const name = `${user.first_name} ${user.last_name}`;
  const map = {
    avatar: (
      <ConfigProvider
        colors={["#2C6BAC", "#0046A6", "#093552", "#000d74", "#41516C"]}
      >
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
      </ConfigProvider>
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
      <button className="user-list-row-item more-user-actions">
        <FontAwesomeIcon icon={faEllipsis} />
      </button>
    ),
  };
  return <>
    {map[elementType]}
  </>;
};

export default DashboardUser;
