import { ActivityData } from "../../../../../store/reducers/asyncActions/fetchActivityData";

const generateMapOfActivities = async (data: ActivityData[]) => {
  const mapLogic = (data: ActivityData[]) => {
    const map: { [key: string]: number } = {};
    for (let d of data) {
      const date = new Date(d.edit_date).toString();
      if (date in map) map[date] += 1;
      else map[date] = 1;
    }
    return map;
  };
  const promise: Promise<{ [key: string]: number }> = new Promise((resolve) => {
    setTimeout(() => {
      resolve(mapLogic(data));
    }, 0);
  });
  return await promise;
};
export default generateMapOfActivities;
// import getMonth from "date-fns/getMonth";
// export
// const categorizeByMonth = async (data: ActivityData[]) => {
//   const categorize = (data: ActivityData[]) => {
//     const monthDataArray: [string, ActivityData[]][] = monthNames.map((mon) => [
//       mon,
//       [],
//     ]);
//     const newMap = monthDataArray.reduce(
//       (acc: { [key: string]: ActivityData[] }, val) => {
//         const [key, value] = val;
//         acc[key] = value;
//         return acc;
//       },
//       {}
//     );
//     data.forEach((activity) => {
//       const date = new Date(activity.edit_date);
//       const monthNum = getMonth(date);
//       const monthName = monthNames[monthNum];
//       //add activity
//       newMap[monthName].push(activity);
//     });
//     return newMap;
//   };
//   const promise: Promise<{
//     [key: string]: ActivityData[];
//   }> = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(categorize(data));
//     }, 0);
//   });
//   return await promise;
// };
// export default categorizeByMonth;
