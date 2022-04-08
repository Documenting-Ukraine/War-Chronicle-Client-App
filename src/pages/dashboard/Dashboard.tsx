import DashboardOverview from "./DashboardOverview";
import DashboardWrapper from "./DashboardWrapper";
import { useRealmApp } from "../../realm/RealmApp";
const Dashboard = ({
  type,
}: {
  type: "overview" | "manage" | "contribute";
}): JSX.Element => {
  const app = useRealmApp();
  const accountType = app.currentUser?.customData?.account_type;
  return (
    <DashboardWrapper>
      <>
        {type === "manage" && accountType === "admin" ? (
          <div></div>
        ) : type === "contribute" ? (
          <div></div>
        ) : (
          <DashboardOverview user={app.currentUser} />
        )}
      </>
    </DashboardWrapper>
  );
};
export default Dashboard;
