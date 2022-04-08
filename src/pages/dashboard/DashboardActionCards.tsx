import { faFileLines, faPlusSquare, faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DashboardActionProps {
  accountType: string;
}
const DashboardActionCards = ({accountType}: DashboardActionProps): JSX.Element => {
  return (
    <div id="dashboard-action-cards">
      <button className="action-card">
        <div className="action-card-header">
          <FontAwesomeIcon icon={faFileLines} />
          <h2>Submit New Record</h2>
        </div>
        <p className="action-card-description">
          {accountType === "admin"
            ? "Create a new record for any category scope"
            : "Create a new record for one of your assigned category scopes"}
        </p>
      </button>
      <button className="action-card">
        {accountType === "admin" ? (
          <>
            <div className="action-card-header">
              <FontAwesomeIcon icon={faUserCircle} />
              <h2>Manage Users</h2>
            </div>
            <p className="action-card-description">
              Assign contributors new scopes or add new users to management
            </p>
          </>
        ) : (
          <>
            <div className="action-card-header">
              <FontAwesomeIcon icon={faPlusSquare} />
              <h2>Request New Scope</h2>
            </div>
            <p className="action-card-description">
              Request access to a new category scope. This will allow you to add
              records to a new category scope of this archive{" "}
            </p>
          </>
        )}
      </button>
    </div>
  );
};
export default DashboardActionCards;
