import { Link } from "react-router-dom";
import { MediaLink } from "../../../types/dataTypes/GeneralRecordType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { RecordSubmissionType } from "../../../types";
import LoadingIcon from "../../utilityComponents/loadingIcon/LoadingIcon";

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
      <div className="recent-list-row-item">
        <div className="d-flex align-items-center">
          <div className="recent-list-item-image">
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
          <div className="recent-list-item-left">
            <div className="recent-list-item-title">{title}</div>
            <div className="recent-list-record-type">
              Category: {recordType}
            </div>
          </div>
        </div>
        <div className="recent-list-date-submitted">
          <div>{"Submitted on "}</div>
          <div>{dateFormat}</div>
        </div>
      </div>
    </>
  );
};
export const RecentList = ({
  contributionsData,
  headerText,
  headerViewAllLink,
  contributeNowLink,
  loadingState,
}: {
  headerText: string;
  headerViewAllLink?: string;
  contributionsData: RecordSubmissionType[] | null;
  contributeNowLink: string;
  loadingState: "success" | "loading" | "failed";
}) => {
  return (
    <>
      <div className="recent-list-header">
        <h2>{headerText}</h2>
        {headerViewAllLink && <Link to={headerViewAllLink}>View All</Link>}
      </div>
      <div className="recent-list-banner">
        {loadingState === "success" &&
        contributionsData &&
        contributionsData.length > 0 ? (
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
        ) : loadingState === "success" ? (
          <div className="recent-list-row-placeholder">
            No submissions recorded.
            <Link to={contributeNowLink}>Contribute Now</Link>
          </div>
        ) : loadingState === "loading" ? (
          <LoadingIcon />
        ) : loadingState === "failed" ? (
          <div className="recent-list-banner-alert">
            <div className="grid-err-alert">
              <div>
                Something went wrong. Please try again later or contact{" "}
                {" " + process.env.REACT_APP_SUPPORT_EMAIL}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};
export default RecentList;
