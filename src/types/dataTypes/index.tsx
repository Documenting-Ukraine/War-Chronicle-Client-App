import { InternationalResponse } from "./InternationalResponse";
import { MediaAndDisInformation } from "./MediaAndDisinformation";
import { RefugeesAndIdps } from "./RefugeesAndIdps";
import { Russia } from "./Russia";
import { StrikesAndAttacks } from "./StrikesAndAttacks";
import { WarCrimes } from "./WarCrimes";
import {CategoriesList, isCategoryScope} from "./CategoryIconMap"
type RecordSubmissionType =
  | InternationalResponse
  | MediaAndDisInformation
  | RefugeesAndIdps
  | Russia
  | StrikesAndAttacks
  | WarCrimes;
type UserDocument = {
  _id: string;
  occupation: string;
  first_name: string;
  last_name: string;
  email: string;
  email_verified: boolean;
  creation_date: string ;
  account_type: "admin" | "contributor";
  external_id?: string;
  user_id?: string;
  category_scopes?: typeof CategoriesList[number][]
};
export function isUserDocument(arg: any): arg is UserDocument{
  try {
    const string_keys = [arg._id, arg.occupation, arg.first_name, arg.last_name, arg.email, arg.creation_date, arg.account_type]
    const allStrings = string_keys.every((value) => typeof value === "string")
    let categories: boolean
    if (arg.account_type === "admin") categories = true
    else categories = arg.category_scopes.every((value: string) => isCategoryScope(value))
    return allStrings && categories
  }
  catch (e) {
      return false
  }
   
}
export type {
  RecordSubmissionType,
  InternationalResponse,
  MediaAndDisInformation,
  RefugeesAndIdps,
  Russia,
  StrikesAndAttacks,
  WarCrimes,
  UserDocument
};
