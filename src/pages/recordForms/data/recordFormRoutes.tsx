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
  const map: { [key: string]: string } = {};
  for (let category of allCategories)
    map[
      category
        .toLowerCase()
        .split(" ")
        .reduce((a, b) => a + b, "")
    ] = category;
  const newStr = words.reduce((a, b) => a + b, "");
  return map[newStr];
};
export default recordFormRoutes;
