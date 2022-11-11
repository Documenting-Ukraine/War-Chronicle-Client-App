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
  url,
}: {
  title: string;
  dateSubmitted: Date;
  recordType: string;
  mainImage?: MediaLink | undefined;
  url: string;
}) => {
  const dateFormat = dateSubmitted.toLocaleDateString("en-us", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  return (
    <Link to={url} className="recent-list-row-item">
      <div className="d-flex align-items-center">
        <div className="recent-list-item-image">
          {!mainImage ? (
            <FontAwesomeIcon icon={faImage} />
          ) : (
            <img
              src={mainImage.url}
              alt={mainImage.description}
            />
          )}
        </div>
        <div className="recent-list-item-left">
          <div className="recent-list-item-title">{title}</div>
          <div className="recent-list-record-type">Category: {recordType}</div>
        </div>
      </div>
      <div className="recent-list-date-submitted">
        <div>{"Submitted on "}</div>
        <div>{dateFormat}</div>
      </div>
    </Link>
  );
};
const RecentListAlert = () => {
  return (
    <div className="recent-list-banner-alert">
      <div className="grid-err-alert">
        <div>
          Something went wrong. Please refresh and try again or contact{" "}
          {" " + process.env.REACT_APP_SUPPORT_EMAIL}
        </div>
      </div>
    </div>
  );
};
export const RecentList = ({
  onScrollListener,
  contributionsData,
  headerText,
  headerViewAllLink,
  contributeNowLink,
  paginationEnd,
  loadingState,
  bannerStyles,
  headerStyles,
  pagination,
}: {
  paginationEnd?: boolean;
  onScrollListener?: (e: React.UIEvent<HTMLElement, UIEvent>) => void;
  headerStyles?: { [key: string]: string };
  bannerStyles?: { [key: string]: string };
  headerText: string;
  headerViewAllLink?: string;
  contributionsData: RecordSubmissionType[] | null;
  contributeNowLink: string;
  loadingState: "success" | "loading" | "failed";
  pagination?: boolean;
}) => {
  const dataRows = contributionsData
    ? contributionsData.map((record) => {
        const title = record.record_title;
        const type = record.record_type;
        const submitted = record.record_creation_date;
        const mainImage = record.media?.main_image;
        const routeType = type?.replace(/ /g, "-").toLowerCase();
        const url = `/records/${routeType}/${record._id.toString()}`;
        return (
          <RecentRow
            key={record._id}
            url={url}
            title={title}
            recordType={type}
            dateSubmitted={new Date(submitted)}
            mainImage={mainImage}
          />
        );
      })
    : [];
  const dataEmpty =
    !contributionsData || (contributionsData && contributionsData.length <= 0);
  return (
    <>
      <div className="recent-list-header" style={headerStyles}>
        <h2>{headerText}</h2>
        {headerViewAllLink && <Link to={headerViewAllLink}>View All</Link>}
      </div>
      <div
        className="recent-list-banner"
        style={bannerStyles}
        onScroll={onScrollListener}
      >
        {loadingState === "success" && !dataEmpty ? (
          <>
            {dataRows}
            {pagination && (
              <div className="recent-list-loading-icon">
                {paginationEnd && (
                  <div
                    style={{
                      height: "3rem",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                      opacity: 0.8
                    }}
                  >
                    No more results
                  </div>
                )}
              </div>
            )}
          </>
        ) : loadingState === "success" ? (
          <div className="recent-list-row-placeholder">
            No submissions recorded.
            <Link to={contributeNowLink}>Contribute Now</Link>
          </div>
        ) : loadingState === "loading" && !dataEmpty && pagination ? (
          <>
            {dataRows}
            <div className="recent-list-loading-icon">
              <LoadingIcon width={"3rem"} />
            </div>
          </>
        ) : loadingState === "loading" ? (
          <LoadingIcon />
        ) : loadingState === "failed" && !pagination && !dataEmpty ? (
          <>
            {dataRows}
            <RecentListAlert />
          </>
        ) : loadingState === "failed" ? (
          <RecentListAlert />
        ) : null}
      </div>
    </>
  );
};
export default RecentList;
