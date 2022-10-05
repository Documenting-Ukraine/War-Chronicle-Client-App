import categoryIconMap from "../../../types/dataTypes/CategoryIconMap";
const allCategories = Object.keys(categoryIconMap);
export const mapRecordFormRoute = (prefix: string) =>
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
  const formType = map[newStr];
  return formType ? formType : "";
};
export const createRecordFormRoutes = mapRecordFormRoute("create-new");
export const updateRecordFormRoutes = mapRecordFormRoute("update-record");
//this is to determine the record type from a route
export const grabCreateRecordFormType = (str: string) =>
  grabFormType(str, /create-new-/);
export const isolateUpdateRecordRoute = (str: string) => {
  const isolateParams = str.split("/");
  const updateRegex = /update-record-/;
  const filter = isolateParams.filter((el) => updateRegex.test(el));
  return filter.length > 0 ? filter[0] : null;
};
export const grabUpdateRecordFormType = (str: string) => {
  const preProcessStr = isolateUpdateRecordRoute(str);
  return grabFormType(preProcessStr ? preProcessStr : "", /update-record-/);
};
