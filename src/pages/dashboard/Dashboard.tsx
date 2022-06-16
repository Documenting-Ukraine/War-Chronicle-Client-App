import { lazy } from "react";
import { useRealmApp } from "../../realm/RealmApp";
const DashboardWrapper = lazy(() => import("./utilities/DashboardWrapper"));
const DashboardOverview = lazy(() => import("./DashboardOverview"));
const DashboardContribute = lazy(() => import("./DashboardContribute"));
const DashboardManage = lazy(() => import("./DashboardManage"));
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
