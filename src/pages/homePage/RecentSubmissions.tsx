import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRealmApp } from "../../realm/RealmApp";
import { clearSearchData } from "../../store/reducers/recordForms/recordFormSearch/recordFormsSearchReducer";
import { RecentList } from "../dashboard/utilities/recentBanner/DashboardRecent";
import {
  fetchRecordForms,
} from "../../store/reducers/asyncActions/recordFormActions/fetchRecordForms";
import { RecordFormSearchQuery } from "../../store/reducers/recordForms/types";
import { RootState } from "../../store/rootReducer";

const RecentSubmissions = ({
  namespace,
  searchQuery
}: {
  namespace: string;
  searchQuery: RecordFormSearchQuery;
}) => {
  const app = useRealmApp();
  const dispatch = useDispatch();
  const recordForms = useSelector(
    (state: RootState) => state.recordForms.search.searched_data
  );
  const recordsData = recordForms.data;
  const loadingState = recordForms.status;
  //clear previous searched on mount
  useEffect(() => {
    dispatch(clearSearchData({}));
  }, [dispatch]);
  useEffect(() => {
    dispatch(
      fetchRecordForms({
        app: app,
        input: {
          searchQuery: searchQuery,
        },
      })
    );
  }, [dispatch, app, searchQuery]);

  return (
    <div id={`${namespace}-recent-submissions-container`}>
      <div id={`${namespace}-recent-submissions`}>
        <RecentList
          headerText={"Recent Submissions"}
          contributeNowLink={
            app.currentUser
              ? `/dashboard/${app.currentUser?.id}/contribute`
              : "/forms/login"
          }
          loadingState={loadingState}
          contributionsData={recordsData}
        />
      </div>
    </div>
  );
};
export default RecentSubmissions;
