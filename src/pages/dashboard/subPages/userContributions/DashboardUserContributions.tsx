import { useState } from "react";
import useFetchRecordData from "../../../../hooks/use-fetch-record-data";
import { useRealmApp } from "../../../../realm/RealmApp";
import { Link } from "react-router-dom";
import RecentList from "../../../utilityComponents/recentList/RecentList";
import PaginationBtns from "./DashboardContributionsPaginationBtns";
const namespace = "dashboard-all-contributions";
const contributionsAtATime = 25;
const DashboardUserContributions = () => {
  const app = useRealmApp();
  const [currPgNum, setCurrPgNum] = useState<number>(0);
  const { data, status, paginationEnd, debouncedNextPagination } =
    useFetchRecordData({
      searchQuery: JSON.stringify({
        contributors: [app.currentUser?.customData.user_id],
      }),
      pagination: true,
    });
  //we do this to pass down a set amount of data at a time
  //this reduces time to load upon large pagination values
  const dataPassed = data.slice(
    currPgNum * contributionsAtATime,
    (currPgNum + 1) * contributionsAtATime
  );
  return (
    <div id={`${namespace}-pg`}>
      <div id={`${namespace}-container`}>
        <Link
          to={`/dashboard/${app.currentUser?.id}/overview`}
          className={`${namespace}-back-btn`}
        >
          Back To Dashboard
        </Link>
        <RecentList
          headerText={"All Contributions"}
          contributeNowLink={
            app.currentUser
              ? `/dashboard/${app.currentUser?.id}/contribute`
              : "/forms/login"
          }
          loadingState={status}
          contributionsData={dataPassed}
        />
        {data.length > 0 && (
          <PaginationBtns
            paginationEnd={paginationEnd}
            currPageNum={currPgNum}
            callback={async (e) => {
              if (!e) return;
              const { clickedNum } = e;
              const itemsNeeded = clickedNum * contributionsAtATime;
              if (itemsNeeded <= data.length) setCurrPgNum(clickedNum);
              //this means we've exceeded the data we have.
              // We need to call to the server again to get the
              // paginatied number
              let numOfItems = data.length;
              while (numOfItems < itemsNeeded) {
                const result = await debouncedNextPagination();
                if (!result) break;
                const endOfList = result.paginationEnd;
                const lengthOfData = result.results.length;
                if (endOfList) break;
                if (lengthOfData <= 0) break;
                numOfItems += lengthOfData;
              }
              //we've reached the number of items needed
              setCurrPgNum(clickedNum);
            }}
          />
        )}
      </div>
    </div>
  );
};
export default DashboardUserContributions;
