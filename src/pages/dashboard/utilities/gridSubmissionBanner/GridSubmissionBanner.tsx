import calculateDays from "./helperFunc/calculateDays";
import GridMonth from "./GridMonth";
import { endOfMonth, differenceInCalendarWeeks, startOfMonth } from "date-fns";
import { memo, useEffect } from "react";
import { fetchActivityData } from "../../../../store/reducers/dashboard/dashboardReducer";
import { RootState } from "../../../../store/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { useRealmApp } from "../../../../realm/RealmApp";
import LoadingIcon from "../../../utilityComponents/loadingIcon/LoadingIcon";
const GridSumbissionBanner = (): JSX.Element => {
  const activityData = useSelector(
    (state: RootState) => state.dashboard.pastYearActivityData
  );
  const pastYearData = activityData.data;
  const status = activityData.status
  const app = useRealmApp();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!pastYearData) dispatch(fetchActivityData(app));
  }, [dispatch, pastYearData, app]);
  const { dataTemplate, startDate, endDate } = calculateDays();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let weekAccumulator = -differenceInCalendarWeeks(
    endOfMonth(startDate),
    startDate
  );

  return (
    <div id="dashboard-grid-banner">
      {status === "loading" && (
        <div className="dashboard-grid-loading">
          <LoadingIcon width={"3.5rem"} />
        </div>
      )}
      <div id="dashboard-grid-header">
        <h1>{pastYearData ? pastYearData.length : 0}</h1>
        <h6>submissions in the past year</h6>
      </div>
      {status === "failed" && (
        <div className="dashboard-grid-err-alert">
          <div>
            Something went wrong. Please try again later or contact{" "}
            {" " + process.env.REACT_APP_SUPPORT_EMAIL}
          </div>
        </div>
      )}
      <div id="dashboard-grid">
        {pastYearData && status === "success" && (
          <svg
            id="dashboard-inner-grid"
            viewBox={`0 0 ${
              (differenceInCalendarWeeks(endDate, startDate) + 12) * 103
            } 920`}
          >
            {dataTemplate.map((data, index) => {
              const currMonthStart = new Date(data.year, data.month, 1);
              const lastMonthStart = new Date(data.year, data.month - 1);
              const calenderWeekDiff =
                differenceInCalendarWeeks(currMonthStart, lastMonthStart) +
                weekAccumulator +
                1;
              const overallX = calenderWeekDiff * 103;
              const currDate = new Date(
                data.year,
                data.month,
                data.totalDays - data.daysLeft === 0
                  ? data.totalDays
                  : data.totalDays - data.daysLeft
              );
              const monthDiff =
                differenceInCalendarWeeks(currDate, startOfMonth(currDate)) -
                1.6;
              const alignTextX = (monthDiff / 2) * 103;
              weekAccumulator = calenderWeekDiff;
              const last = index === dataTemplate.length - 1 ? endDate : null;
              return (
                <g
                  transform={`translate(${overallX})`}
                  key={`${data.month}-${data.year}`}
                  className="grid-month"
                >
                  <GridMonth
                    monthData={data}
                    activityData={{}}
                    lastMonth={last}
                  />
                  <text y={880} x={alignTextX} className="month-name">
                    {monthNames[data.month]}
                  </text>
                </g>
              );
            })}
          </svg>
        )}
      </div>
    </div>
  );
};
//we dont want this banner re-rendering after initial load. It contains +1000 svg elements
export default memo(GridSumbissionBanner);
