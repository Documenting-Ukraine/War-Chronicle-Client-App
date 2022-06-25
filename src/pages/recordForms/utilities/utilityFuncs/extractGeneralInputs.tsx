import transformCamelToSnakeCase from "./transformCamelToSnake";
import {
  FormDataIndexType,
  extractStringFormData,
} from "./extractStringFormData";
import { RecordSubmissionType } from "../../../../types";
import { extractEvidencePairs } from "./extractEvidencePairs";
import { extractDateValues } from "./extractDateValues";
import { extractAddressValues } from "./extractAddressValues";
const extractGeneralInputs = (
  record: FormDataIndexType
): Partial<RecordSubmissionType> => {
  const generalProps: Partial<RecordSubmissionType> = {
    record_title: extractStringFormData("recordTitle", record),
    description: extractStringFormData("description", record),
    evidence: extractEvidencePairs(record),
    date_first_published: extractDateValues({
      name: "dateFirstPublished",
      formData: record,
      timeInput: true,
    }),
    date_event_occurred: extractDateValues({
      name: "dateEventOccurred",
      formData: record,
      timeInput: true,
    }),
    address: extractAddressValues(record),
  };
  //filter out null keys
  for (let key of Object.keys(generalProps)) {
    if (!generalProps[key]) delete generalProps[key];
  }
  return generalProps;
};
export default extractGeneralInputs;
