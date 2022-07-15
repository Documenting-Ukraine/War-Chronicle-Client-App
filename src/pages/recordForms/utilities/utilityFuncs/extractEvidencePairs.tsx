import { isArrayOneOrMore } from "../../../../types/dataTypes/GeneralRecordType";
import { FormDataIndexType } from "./extractStringFormData";
import { RecordSubmissionType } from "../../../../types";
import {v4 as uuidv4} from "uuid"
export const extractEvidencePairs = (
    formData: FormDataIndexType
  ): RecordSubmissionType["evidence"] => {
    const evidenceRegex = /evidenceList.*/;
    const evidenceKeys = Object.keys(formData).filter((key) =>
      evidenceRegex.test(key)
    );
    const groupMatches: { [key: string]: string } = {};
    const loopThroughKeys = (keyPrefix: "Link" | "Description") => {
      for (let currKey of evidenceKeys) {
        const numberRegex = /[0-9].*/;
        const currIdxURLKey = currKey.match(numberRegex);
        const urlKey = `evidenceListLink${currIdxURLKey ? currIdxURLKey[0] : ""}`;
        if (keyPrefix === "Link" && urlKey === currKey)
          groupMatches[currKey] = "";
        else if (keyPrefix === "Description" && urlKey in groupMatches)
          groupMatches[urlKey] = currKey;
      }
    };
    loopThroughKeys("Link");
    loopThroughKeys("Description");
    const groupKeyMatches = Object.entries(groupMatches).map(([key, value]) => {
      return {
        url: formData[key].toString(),
        description: formData[value].toString(),
        _id: uuidv4()
      };
    });
    return isArrayOneOrMore(groupKeyMatches)
      ? groupKeyMatches
      : [{_id:uuidv4(),  url: "", description: "" }];
  };
  