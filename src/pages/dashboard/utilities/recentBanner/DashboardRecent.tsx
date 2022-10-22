import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRealmApp } from "../../../../realm/RealmApp";
import { RootState } from "../../../../store/rootReducer";
import { useDispatch } from "react-redux";
import RecentList from "../../../utilityComponents/recentList/RecentList";
import { fetchRecordForms } from "../../../../store/reducers/asyncActions/recordFormActions/fetchRecordForms";
import { clearSearchData } from "../../../../store/reducers/recordForms/recordFormSearch/recordFormsSearchReducer";

const DashboardRecent = (): JSX.Element => {
  const recordForms = useSelector(
    (state: RootState) => state.recordForms.search.searched_data
  );
  const recordFormData = recordForms.data;
  const recordFormPagination = recordForms.pagination_end;
  const recordFormLoadingState = recordForms.status;
  const app = useRealmApp();
  const dispatch = useDispatch();
  //clear any old data
  useEffect(() => {
    dispatch(clearSearchData({}));
    return () => {
      dispatch(clearSearchData({}));
    };
  }, [app, dispatch]);

  useEffect(() => {
    const _id = app.currentUser?.customData.user_id;
    //we set this restriction so it doesn't continously fetch
    //data that is incorrect
    if (recordFormData.length <= 0 && !recordFormPagination)
      dispatch(
        fetchRecordForms({
          app,
          input: {
            searchQuery: {
              contributors: [typeof _id === "string" ? _id : ""],
            },
          },
        })
      );
  }, [recordFormData, recordFormPagination, dispatch, app]);
  return (
    <RecentList
      contributionsData={recordFormData}
      headerText={"Your recent contributions"}
      headerViewAllLink={"../all-contributions"}
      contributeNowLink={`/dashboard/${app?.currentUser?.id}/contribute`}
      loadingState={recordFormLoadingState}
    />
  );
};
export default DashboardRecent;
