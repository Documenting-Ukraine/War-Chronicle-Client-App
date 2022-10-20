import { ObjectId } from "bson";
import { isObject, isDate } from "lodash";
//converts all date objects to strings, and converts all object ids to strings
function serializeObjects(e: object, serializeArr: boolean = false) {
  try {
    const entries = Object.entries(e).map(([key, value]: [string, any]) => {
      let subObj: any = {};
      const isObj = !Array.isArray(value) && isObject(value);
      const isDateOrObjectId = isDate(value) || ObjectId.isValid(value);
      //seralize dates and object ids
      if (isObj && isDateOrObjectId) return [key, value.toString()];
      //serialize arrays, but this is conditional since
      // this is extremely expensive as you loop through large arrays
      else if (serializeArr && Array.isArray(value))
        return [key, serializeArrays(value)];
      else if (isObj) subObj = serializeObjects(value, serializeArr);
      //return serialized objs
      if (Object.keys(subObj).length > 0) return [key, subObj];
      else return [key, value];
    });
    const newObj: any = {};
    entries.forEach(([key, value]) => {
      newObj[key] = value;
    });
    return newObj;
  } catch (err) {
    console.error(err);
    return e;
  }
}
export function serializeArrays(e: any[]) {
  try {
    const newArr = e.map((el) => {
      if (isObject(el)) return serializeObjects(el, true);
      else return el;
    });
    return newArr;
  } catch (err) {
    console.error(err);
    return e;
  }
}
export default serializeObjects;
