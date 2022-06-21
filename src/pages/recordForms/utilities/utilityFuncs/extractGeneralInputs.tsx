import { RecordSubmissionType } from "../../../../types";
import transformCamelToSnakeCase from "./transformCamelToSnake";
const extractGeneralInputs = (record: {
  [key: string]: FormDataEntryValue;
}): Partial<RecordSubmissionType> => {
  // const snakeCaseObject: { [key: string]: FormDataEntryValue } = {};
  // const evidenceRegex = /evidence_list/;
  // const snakeCaseKeys = Object.keys(record)
  // for (let key of snakeCaseKeys)
  //   snakeCaseObject[transformCamelToSnakeCase(key)] = record[key];
  return {};
};
export default extractGeneralInputs;
