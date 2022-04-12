import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useRealmApp } from "../../../realm/RealmApp";
import { RootState } from "../../../store/rootReducer";
import { useDispatch } from "react-redux";
import { fetchContributions } from "../../../store/reducers/dashboard/userDashboard";
import { MediaLink } from "../../../store/reducers/types/GeneralRecordType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
const RecentRow = ({
  title,
  dateSubmitted,
  recordType,
  mainImage,
}: {
  title: string;
  dateSubmitted: Date;
  recordType: string;
  mainImage?: MediaLink | undefined;
}) => {
  const dateFormat = dateSubmitted.toLocaleDateString("en-us", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  return (
    <>
      <div className="dashboard-recent-row-item">
        <div className="d-flex align-items-center">
          <div className="dashboard-recent-item-image">
            {!mainImage ? (
              <FontAwesomeIcon icon={faImage} />
            ) : (
              <img
                src={
                  mainImage?.thirdPartyURL
                    ? mainImage.thirdPartyURL
                    : mainImage?.localURL
                }
                alt={mainImage?.description}
              />
            )}
          </div>
          <div className="dashboard-recent-item-left">
            <div className="dashboard-recent-item-title">Title: {title}</div>
            <div className="dashboard-recent-record-type">
              Category: {recordType}
            </div>
          </div>
        </div>
        <div className="dashboard-recent-date-submitted">
          Submitted: {dateFormat}
        </div>
      </div>
    </>
  );
};
const DashboardRecent = (): JSX.Element => {
  const contributions = useSelector(
    (state: RootState) => state.dashboard.contributionsData
  );
  const contributionsData = contributions.data;
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
  const app = useRealmApp();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!contributionsData) dispatch(fetchContributions(app));
  }, [contributionsData, dispatch, app]);
  return (
    <>
      <div id="dashboard-recent-header">
        <h2>Recent contributions</h2>
        <Link to="all-contributions">View All</Link>
      </div>
      <div id="dashboard-recent-banner">
        {contributionsData && contributionsData.length>0 ?
          contributionsData.map((record) => {
            const title = record.recordTitle;
            const type = record.recordType;
            const submitted = record.recordCreationDate;
            const mainImage = record.media?.mainImage;
            return (
              <RecentRow
                key={record._id}
                title={title}
                recordType={type}
                dateSubmitted={submitted}
                mainImage={mainImage}
              />
            );
          })
          : <div id="dashboard-recent-row-placeholder">
            No submissions recorded. 
            <Link to={`dashboard/${app?.currentUser?.id}/contribute`}>Contribute Now</Link>
          </div>}
      </div>
    </>
  );
};
export default DashboardRecent;
