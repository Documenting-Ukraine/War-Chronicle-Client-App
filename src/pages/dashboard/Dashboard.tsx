import DashboardWrapper from "./utilities/DashboardWrapper";
import DashboardOverview from "./DashboardOverview";
import DashboardContribute from "./DashboardContribute";
import DashboardManage from "./DashboardManage";
import { useRealmApp } from "../../realm/RealmApp";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
const Dashboard = ({
  type,
}: {
  type: "overview" | "manage" | "contribute" | "landing";
  }): JSX.Element => {

  const app = useRealmApp();
  const location = useLocation().pathname
  const navigate = useNavigate()
  useEffect(() => {
    const params = location.split("/")
    const endParams = {
      "contribute": true, 
      "manage": true,
      "overview": true
    }
    if (!(params[params.length - 1] in endParams)) navigate("overview")
  }, [location, navigate]);
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
