import DashboardWrapper from "./utilities/DashboardWrapper";
import DashboardOverview from "./DashboardOverview";
import DashboardContribute from "./DashboardContribute";
import DashboardManage from "./DashboardManage";
import { useRealmApp } from "../../realm/RealmApp";

const Dashboard = ({
  type,
}: {
  type: "overview" | "manage" | "contribute" | "landing";
  }): JSX.Element => {

  const app = useRealmApp();

  const accountType = app.currentUser?.customData?.account_type;
  return (
    <DashboardWrapper>
      <>
        {type === "manage" && accountType === "admin" ? (
          <DashboardManage />
        ) : type === "contribute" ? (
          <DashboardContribute />
        ) : (
          <DashboardOverview user={app.currentUser} />
        )}
      </>
    </DashboardWrapper>
  );
};
export default Dashboard;
