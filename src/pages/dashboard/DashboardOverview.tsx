import DashboardActionCards from "./utilities/actionCards/DashboardActionCards";
import GridSumbissionBanner from "./utilities/gridSubmissionBanner/GridSubmissionBanner";
import DashboardRecent from "./utilities/recentBanner/DashboardRecent";
import RequestNewScopesModal from "./utilities/modals/RequestUserScope";
import { useState } from "react";
import {
  faFileLines,
  faPlusSquare,
  faUserCircle,
} from "@fortawesome/free-regular-svg-icons";
const DashboardOverview = ({
  user,
  accountType
}: {
  user: Realm.User | null;
  accountType: "admin" | "contributor"
}): JSX.Element => {
  const [requestScope, setRequestScope] = useState(false)
  //const accountType = user?.customData?.account_type;
  const firstName = user?.customData?.first_name;
  const cardData = [
    {
      additionalRoute: "contribute",
      cardIcon: faFileLines,
      cardHeading: "Submit New Record",
      cardDescription:
        accountType === "admin"
          ? "Create a new record for any category scope"
          : "Create a new record for one of your assigned category scopes",
    },
    {
      additionalRoute: accountType === "admin" ? "manage" : "",
      isBtn: () => setRequestScope(true),
      cardIcon: accountType === "admin" ? faUserCircle : faPlusSquare,
      cardHeading: accountType === "admin" ? "Manage Users" : "Request New Scope",
      cardDescription:
        accountType === "admin"
          ? "Assign contributors new scopes or add new users to management"
          : "Request access to a new category scope. This will allow you to add records to a new category scope of this archive",
    },
  ];
  return (
    <>
      {requestScope && <RequestNewScopesModal closePopUp={setRequestScope}/> }
      <div id={"dashboard-greeting"}>
        <h1>{`Hello ${firstName} !`}</h1>
        <p>Welcome back !</p>
      </div>
      {(accountType === "admin" || accountType === "contributor") && (
        <DashboardActionCards cardData={cardData} />
      )}
      <GridSumbissionBanner />
      <DashboardRecent />
    </>
  );
};
export default DashboardOverview;
