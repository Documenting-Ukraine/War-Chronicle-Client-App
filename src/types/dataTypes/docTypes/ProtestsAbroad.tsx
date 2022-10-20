import { isInList } from "../DataLists";
import { Address, GeneralEventType } from "../GeneralRecordType";
export const ProtestAbroadRegion = [
  "Belarus",
  "Caucasus",
  "Central Asia",
  "Ukraine",
] as const;
export const isProtestAbroadRegion = (
  e: string
): e is typeof ProtestAbroadRegion[number] => isInList(e, ProtestAbroadRegion);
export type ProtestsAbroadAddress = Omit<
Address, "oblast" | 'city'
> & {[key: string]: string};
export type ProtestsAbroadGeneral = Omit<GeneralEventType, "address"> & {
  record_type: "Protests Abroad";
  protest_location: typeof ProtestAbroadRegion[number];
  num_of_protesters?: number;
  num_of_arrests?: number;
  num_of_hospitalizations?: number;
  address: ProtestsAbroadAddress;
};
export type ProtestsUkraine = ProtestsAbroadGeneral & {
  address: Address;
};
export type ProtestsBelarus = ProtestsAbroadGeneral & {
  address: ProtestsAbroadAddress;
};
export type ProtestsCaucasus = ProtestsAbroadGeneral;
export type ProtestsCentralAsia = ProtestsAbroadGeneral;
export type ProtestsAbroad =
  | ProtestsUkraine
  | ProtestsCaucasus
  | ProtestsCentralAsia
  | ProtestsBelarus;
