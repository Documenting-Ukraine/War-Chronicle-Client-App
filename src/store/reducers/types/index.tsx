import { InternationalResponse } from "./InternationalResponse";
import { MediaAndDisInformation } from "./MediaAndDisinformation";
import { RefugeesAndIdps } from "./RefugeesAndIdps";
import { Russia } from "./Russia";
import { StrikesAndAttacks } from "./StrikesAndAttacks";
import { WarCrimes } from "./WarCrimes";
type RecordSubmissionType =
  | InternationalResponse
  | MediaAndDisInformation
  | RefugeesAndIdps
  | Russia
  | StrikesAndAttacks
  | WarCrimes;

export type {
  RecordSubmissionType,
  InternationalResponse,
  MediaAndDisInformation,
  RefugeesAndIdps,
  Russia,
  StrikesAndAttacks,
  WarCrimes,
};
