import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useRealmApp } from "../../../../realm/RealmApp";
import { RootState } from "../../../../store/rootReducer";
import { useDispatch } from "react-redux";
import { fetchContributions } from "../../../../store/reducers/dashboard/dashboardReducer";
import { MediaLink } from "../../../../types/dataTypes/GeneralRecordType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { RecordSubmissionType } from "../../../../store/reducers/dashboard/dashboardReducer";
export const RecentRow = ({
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
                src={mainImage}
                alt={""}
                //src={mainImage.local_url}
                //alt={mainImage?.description}
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
export const RecentList = ({
  contributionsData,
  headerText,
  headerViewAllLink,
  contributeNowLink
}: {
  headerText: string;
  headerViewAllLink?: string;
  contributionsData: RecordSubmissionType[] | null;
  contributeNowLink: string;
}) => {
  return (
    <>
      <div id="dashboard-recent-header">
        <h2>{headerText}</h2>
        {headerViewAllLink && <Link to={headerViewAllLink}>View All</Link>}
      </div>
      <div id="dashboard-recent-banner">
        {contributionsData && contributionsData.length > 0 ? (
          contributionsData.map((record) => {
            const title = record.record_title;
            const type = record.record_type;
            const submitted = record.record_creation_date;
            const mainImage = record.media?.main_image;
            return (
              <RecentRow
                key={record._id}
                title={title}
                recordType={type}
                dateSubmitted={new Date(submitted)}
                mainImage={mainImage}
              />
            );
          })
        ) : (
          <div id="dashboard-recent-row-placeholder">
            No submissions recorded.
            <Link to ={contributeNowLink}>
              Contribute Now
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
const DashboardRecent = (): JSX.Element => {
  const contributions = useSelector(
    (state: RootState) => state.dashboard.contributionsData
  );
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
    if (!contributionsData) dispatch(fetchContributions(app));
  }, [contributionsData, dispatch, app]);
  return (
    <RecentList
      contributionsData={contributionsData}
      headerText={"Your recent contributions"}
      headerViewAllLink = {"../all-contributions"}
      contributeNowLink = {`/dashboard/${app?.currentUser?.id}/contribute`}
    />
  );
};
export default DashboardRecent;
