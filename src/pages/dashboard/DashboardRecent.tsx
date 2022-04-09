import { useEffect } from "react";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom"
import { useRealmApp } from "../../realm/RealmApp";
import { RootState } from "../../store/rootReducer";
import { useDispatch } from "react-redux";
import { fetchContributions } from "../../store/reducers/dashboard/userDashboard";
const DashboardRecent = (): JSX.Element => {
  const contributions = useSelector((state: RootState) => state.dashboard.contributionsData)
  const contributionsData = contributions.data
  const app = useRealmApp()
  const dispatch = useDispatch()
  useEffect(() => {
    if(!contributionsData) dispatch(fetchContributions(app))
  }, [contributionsData, dispatch, app])
  return (
  <>
      <div id="dashboard-recent-header">
        <h2>Recent contributions</h2>
        <Link to="all-contributions">View All</Link>
      </div>
      <div id="dashboard-recent-banner">
        {contributionsData && contributionsData.map(() => {
             
        })}
      </div>
    </>
  );
};
export default DashboardRecent;
