import IntroBanner from "./IntroBanner";
import RecentSubmissions from "./RecentSubmissions";
import { RecordFormSearchQuery } from "../../store/reducers/recordForms/types";
const HomePage = (): JSX.Element => {
  const namespace = "home-page";
  const recentFormDataQuery: RecordFormSearchQuery = {
    sortBy: "newest_creation_date",
  };
  return (
    <div className={`${namespace}-container`}>
      <IntroBanner namespace={namespace} />
      <RecentSubmissions
        namespace={namespace}
        searchQuery={recentFormDataQuery}
      />
    </div>
  );
};
export default HomePage;
