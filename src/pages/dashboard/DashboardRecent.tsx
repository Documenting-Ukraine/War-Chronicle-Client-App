import {Link} from "react-router-dom"
const DashboardRecent = (): JSX.Element => {
  return(
  <>
      <div id="dashboard-recent-header">
        <h2>Recent contributions</h2>
        <Link to="all-contributions">View All</Link>
      </div>
    <div id="dashboard-recent-banner"></div>
    </>
  );
};
export default DashboardRecent;
