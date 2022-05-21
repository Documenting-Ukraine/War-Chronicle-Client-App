import categoryIconMap from "../../../types/dataTypes/CategoryIconMap";
const allCategories = Object.keys(categoryIconMap);
const recordFormRoutes = allCategories.map((category) => {
  //this is for routing, as urls cannot have spaces
  const newCategory = category.replace(/ /g, "-").toLowerCase();
  return `create-new-${newCategory}`;
});
//this is to determine the record type from a route
export const grabRecordFormType = (str: string) => {
  const removedPrefix = str.replace(/create-new-/, "");
  const words = removedPrefix.split(/-/);
  const newStr = words.reduce((a, b) => {
    const upper = b[0].toUpperCase();
    const subString = b.substring(1, b.length);
    const newB = upper + subString;
    return a + " " + newB;
  }, "");
  return newStr.substring(1, newStr.length);
};
export default recordFormRoutes;
