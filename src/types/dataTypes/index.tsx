import { InternationalResponse } from "./InternationalResponse";
import { MediaAndDisInformation } from "./MediaAndDisinformation";
import { RefugeesAndIdps } from "./RefugeesAndIdps";
import { Russia } from "./Russia";
import { StrikesAndAttacks } from "./StrikesAndAttacks";
import { WarCrimes } from "./WarCrimes";
import {CategoriesList} from "./CategoryIconMap"
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
  creation_date: Date;
  account_type: "admin" | "contributor";
  external_id: string;
  user_id: string;
  category_scopes?: typeof CategoriesList[number][]
};
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
