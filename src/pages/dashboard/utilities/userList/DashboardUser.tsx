import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Avatar from "react-avatar";
import { UserDocument } from "../../../../store/reducers/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashboardUser = ({ user }: { user: UserDocument }) => {
  const name = `${user.first_name} ${user.last_name}`;
  return (
    <div className="dashboard-user-list-row">
      <div>
        <Avatar
          name={name}
          className={"user-dropdown-avatar"}
          size={"1.4rem"}
          round={true}
          style={{ fontSize: "1.4rem" }}
        />
        <span>{name}</span>
      </div>
      <div>{`${user.email}`}</div>
      <div>
        {user.creation_date.toLocaleDateString("en-us", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })}
      </div>
      <FontAwesomeIcon icon={faEllipsis} />
    </div>
  );
};

export default DashboardUser;
