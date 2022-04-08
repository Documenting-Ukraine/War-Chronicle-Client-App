import DashboardActionCards from "./DashboardActionCards";
import GridSumbissionBanner from "./gridSubmissionBanner/GridSubmissionBanner";
import DashboardRecent from "./DashboardRecent";

const DashboardOverview = ({
  user
}:{
  user: Realm.User | null
}): JSX.Element => {
  const accountType = user?.customData?.account_type
  const firstName = user?.customData?.first_name
  return (
    <>
      <div id={"dashboard-greeting"}>
        <h1>{`Hello ${firstName} !`}</h1>
        <p>Welcome back !</p>
      </div>
      {(accountType === "admin" || accountType ==="contributor") && 
        <DashboardActionCards accountType={accountType} />
      }
        <GridSumbissionBanner />
        <DashboardRecent />
    </>
  );
};
export default DashboardOverview;
