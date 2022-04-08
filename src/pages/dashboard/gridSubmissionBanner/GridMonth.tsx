import { MonthDataTemplate } from "./helperFunc/calculateDays";
import GridDay from "./GridDay";
import { add, isBefore, endOfMonth, endOfWeek } from "date-fns";
interface ActivityDataTemplate {
  [key: string]: number;
}
const GridMonth = ({
  monthData,
  activityData,
}: {
  monthData: MonthDataTemplate;
  activityData: ActivityDataTemplate;
}) => {
  const weekArr: React.SVGProps<SVGGElement>[] = [];
  let currDay = new Date(
    monthData.year,
    monthData.month,
    monthData.daysLeft - monthData.totalDays + 1
  );
  const lastDay = endOfMonth(currDay);
  //generate svg groups according to day groups
  let weekCounter = 0;
  while (isBefore(currDay, lastDay)) {
    const lastDayWeek = endOfWeek(currDay);
    const daysArr: JSX.Element[] = [];
    let dayCounter = 0;
    while (isBefore(currDay, lastDayWeek) && isBefore(currDay, lastDay)) {
      daysArr.push(
        <GridDay
          key={dayCounter}
          dayData={currDay}
          activityNum={
            currDay.toString() in activityData
              ? activityData[currDay.toString()]
              : 0
          }
        />
      );
      currDay = add(currDay, { days: 1 });
      dayCounter++;
    }
    const wrapper = (
      <g
        key={weekCounter}
        className="grid-week"
        transform={`translate(${103 * weekCounter})`}
      >
        {daysArr}
      </g>
    );
    weekArr.push(wrapper);
    weekCounter++;
  }
  return <g>{weekArr}</g>;
};
export default GridMonth;
