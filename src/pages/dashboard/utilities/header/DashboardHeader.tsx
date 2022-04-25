import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
interface DashboardHeaderProps {
  accountType: "admin" | "contributor";
}
const DashboardHeader = ({
  accountType,
}: DashboardHeaderProps): JSX.Element => {
  const route = useLocation();
  const lastPath = route.pathname.split("/");
  const selected = lastPath[lastPath.length - 1];
  const contribute = selected === "contribute";
  const manage = selected === "manage";
  const params = useParams();
  return (
    <div id="dashboard-header">
      <Link
        to={`/dashboard/${params.id}/overview`}
        className={!contribute && !manage ? "selected" : ""}
      >
        Overview
      </Link>
      <Link
        to={`/dashboard/${params.id}/contribute`}
        className={contribute ? "selected" : ""}
      >
        Contribute
      </Link>
      {accountType === "admin" && (
        <Link
          to={`/dashboard/${params.id}/manage`}
          className={manage ? "selected" : ""}
        >
          Manage
        </Link>
      )}
    </div>
  );
};
export default DashboardHeader;
