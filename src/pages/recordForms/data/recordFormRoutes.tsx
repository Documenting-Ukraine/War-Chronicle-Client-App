import categoryIconMap from "../../../types/dataTypes/CategoryIconMap";
const allCategories = Object.keys(categoryIconMap);
const mapRecordFormRoute = (prefix: string) =>
  allCategories.map((category) => {
    //this is for routing, as urls cannot have spaces
    const newCategory = category.replace(/ /g, "-").toLowerCase();
    return `${prefix}-${newCategory}`;
  });
const grabFormType = (str: string, prefix: RegExp) => {
  const removedPrefix = str.replace(prefix, "");
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
export const createRecordFormRoutes = mapRecordFormRoute("create-new");
export const updateRecordFormRoutes = mapRecordFormRoute("update-record");
//this is to determine the record type from a route
export const grabCreateRecordFormType = (str: string) =>
  grabFormType(str, /create-new-/);
export const grabUpdateRecordFormType = (str: string) =>
  grabFormType(str, /update-record-/);
