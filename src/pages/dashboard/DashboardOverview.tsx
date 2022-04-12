import DashboardActionCards from "./utilities/actionCards/DashboardActionCards";
import GridSumbissionBanner from "./utilities/gridSubmissionBanner/GridSubmissionBanner";
import DashboardRecent from "./utilities/recentBanner/DashboardRecent";
import overviewActionCardData from "./staticData/OverviewActionCardData";

const DashboardOverview = ({
  user,
}: {
  user: Realm.User | null;
}): JSX.Element => {
  const accountType = user?.customData?.account_type;
  const firstName = user?.customData?.first_name;
  const cardData = overviewActionCardData(typeof accountType === "string" ? accountType: "")
  return (
    <>
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
