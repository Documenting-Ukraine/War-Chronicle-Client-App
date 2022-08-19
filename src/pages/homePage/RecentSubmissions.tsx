import { useRealmApp } from "../../realm/RealmApp";
import { RecentList } from "../dashboard/utilities/recentBanner/DashboardRecent";
const RecentSubmissions = ({ namespace }: { namespace: string }) => {
  const app = useRealmApp();
  return (
    <div id={`${namespace}-recent-submissions-container`}>
        <div id = {`${namespace}-recent-submissions`}>
        <RecentList
        headerText={"Recent Submissions"}
        contributeNowLink={
          app.currentUser
            ? `/dashboard/${app.currentUser?.id}/contribute`
            : "/forms/login"
        }
        contributionsData={null}
      />
        </div>

    </div>
  );
};
export default RecentSubmissions;
