import { Address, GeneralEventType } from "../GeneralRecordType";
export const ProtestAbroadRegion = [
  "Belarus",
  "Caucasus",
  "Central Asia",
  "Ukraine",
] as const;
export type ProtestsAbroadAddress = Omit<
  GeneralEventType["address"],
  "oblast" | "city"
>;
export type ProtestsAbroadGeneral = Omit<GeneralEventType, "address"> & {
  record_type: "Protests Abroad";
  protest_location: typeof ProtestAbroadRegion[number];
  num_of_protesters?: number;
  num_of_arrests?: number;
  num_of_hospitalizations?: number;
};
export type ProtestsUkraine = {
  address: Address;
};
export type ProtestsBelarus = {
  address: {};
};
export type ProtestsCaucasus = {};
export type ProtestsCentralAsia = {};
