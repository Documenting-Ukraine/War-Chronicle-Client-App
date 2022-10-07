import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRealmApp } from "../../../../realm/RealmApp";
import { RootState } from "../../../../store/rootReducer";
import { useDispatch } from "react-redux";
import { fetchContributions } from "../../../../store/reducers/dashboard/dashboardReducer";
import RecentList from "../../../utilityComponents/recentList/RecentList";

const DashboardRecent = (): JSX.Element => {
  const contributions = useSelector(
    (state: RootState) => state.dashboard.contributionsData
  );
  const loadingState = contributions.status;
  const contributionsData = contributions.data;
  const app = useRealmApp();
  const dispatch = useDispatch();
  // const contributionsData = [
  //   {
  //     _id: "unique",
  //     recordTitle: "hello",
  //     recordCreationDate: new Date(),
  //     media: {
  //       mainImage: undefined,
  //     },
  //     description: "hello",
  //     recordType: "War Crimes",
  //     warCrime: [],
  //   },
  //   {
  //     _id: "unique1",
  //     recordTitle: "hello",
  //     recordCreationDate: new Date(),
  //     media: {
  //       mainImage: undefined,
  //     },
  //     description: "hello",
  //     recordType: "War Crimes",
  //     warCrime: [],
  //   },
  //   {
  //     _id: "unique2",
  //     recordTitle: "hello",
  //     recordCreationDate: new Date(),
  //     media: {
  //       mainImage: undefined,
  //     },
  //     description: "hello",
  //     recordType: "War Crimes",
  //     warCrime: [],
  //   },
  // ];
  useEffect(() => {
    const _id = app.currentUser?.customData._id 
    if (!contributionsData) dispatch(fetchContributions({
      app, 
      input:{
        searchQuery:{
          contributors: [typeof _id === 'string'? _id: ""]
        }
      }
    }));
  }, [contributionsData, dispatch, app]);
  return (
    <RecentList
      contributionsData={contributionsData}
      headerText={"Your recent contributions"}
      headerViewAllLink={"../all-contributions"}
      contributeNowLink={`/dashboard/${app?.currentUser?.id}/contribute`}
      loadingState={loadingState}
    />
  );
};
export default DashboardRecent;
