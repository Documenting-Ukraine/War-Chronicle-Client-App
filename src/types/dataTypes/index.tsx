import { InternationalResponse } from "./docTypes/InternationalResponse";
import { MediaAndDisInformation } from "./docTypes/MediaAndDisinformation";
import { RefugeesAndIdps } from "./docTypes/RefugeesAndIdps";
import { ProtestsAbroad } from "./docTypes/ProtestsAbroad";
import { Russia } from "./docTypes/Russia";
import { WarCrimes } from "./docTypes/WarCrimes";
import { CategoriesList, isCategoryScope } from "./CategoryIconMap";
import { ObjectId } from "mongodb";

type RecordSubmissionType =
  InternationalResponse
  | MediaAndDisInformation
  | RefugeesAndIdps
  | Russia
  | WarCrimes
  | ProtestsAbroad;
// type RecordSubmissionProps = InternationalResponse
// & MediaAndDisInformation
// & RefugeesAndIdps
// & Russia
// & WarCrimes
// & ProtestsAbroad;
type UserDocument = {
  _id: string;
  occupation: string;
  first_name: string;
  last_name: string;
  email: string;
  email_verified: boolean;
  creation_date: string;
  account_type: "admin" | "contributor";
  external_id?: string;
  user_id?: string;
  category_scopes?: typeof CategoriesList[number][];
};
type UserCustomData = Omit<UserDocument, "creation_date" | "_id"> & {
  creation_date: Date;
  _id: ObjectId;
};
export function isUserCustomData(arg: any): arg is UserCustomData {
  try{
    const copyArg = { ...arg };
    copyArg._id = copyArg._id.toString();
    copyArg.creation_date = copyArg.creation_date.toString();
    return isUserDocument(copyArg);
  }catch(e){
    return false
  }
}
export function isUserDocument(arg: any): arg is UserDocument {
  try {
    const string_keys = [
      arg._id,
      arg.occupation,
      arg.first_name,
      arg.last_name,
      arg.email,
      arg.creation_date,
      arg.account_type,
    ];
    const allStrings = string_keys.every((value) => typeof value === "string");
    let categories: boolean;
    if (arg.account_type === "admin") categories = true;
    else
      categories = arg.category_scopes.every((value: string) =>
        isCategoryScope(value)
      );
    return allStrings && categories;
  } catch (e) {
    return false;
  }
}
export type {
  RecordSubmissionType,
  InternationalResponse,
  MediaAndDisInformation,
  RefugeesAndIdps,
  Russia,
  WarCrimes,
  UserDocument,
};
