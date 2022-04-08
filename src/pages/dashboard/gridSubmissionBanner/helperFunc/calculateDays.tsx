import {
  add,
  sub,
  isBefore,
  endOfMonth,
  differenceInDays,
  getDaysInMonth,
  startOfMonth,
  getYear,
  getMonth
} from "date-fns";
interface MonthDataTemplate {
  month: number;
  daysLeft: number;
  totalDays: number;
  year: number;
}
const calculateDays = () => {
  const today = new Date();
  let year = sub(today, {
    years: 1,
  }); 
    year = add(year, {
        months: 1
    })
    year = startOfMonth(year)
  const yearArr: MonthDataTemplate[] = [];
  //loop through until we reach current month
  while (isBefore(year, today)) {
    const daysInMonth = getDaysInMonth(year);
    const endMonth = endOfMonth(year);
    const diffDays = differenceInDays(endMonth, year);
    const monthAbbrev = getMonth(year);
    yearArr.push({
      month: monthAbbrev,
      daysLeft: diffDays + 1,
      totalDays: daysInMonth,
      year: getYear(year),
    });
    year = startOfMonth(year);
    year = add(year, {
      months: 1,
    });
  }
  //add remainder of days for current month
  const currMonthEnd = endOfMonth(today);
  const difference = differenceInDays(currMonthEnd, today);
  const currMonthAbbrev = getMonth(today);
  yearArr.pop();
  yearArr.push({
    month: currMonthAbbrev,
    daysLeft: difference,
    totalDays: getDaysInMonth(today),
    year: getYear(today),
  });
  let start = sub(today, {
    years: 1,
  }); 
    start = add(start, {
        months: 1
    })
    start = startOfMonth(start)
  return {
    dataTemplate: yearArr,
    startDate: start,
    endDate: today,
  };
};

export default calculateDays;
export type{MonthDataTemplate}