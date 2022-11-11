import { isInList } from "./DataLists";
import { OblastRegion } from "./OblastRegionType";
export const addressKeys = ["oblast", "city", "latitude", "longitude"] as const;
export const isAddressKey = (
  e: string
): e is typeof addressKeys[number] | keyof Address => isInList(e, addressKeys);
export type Address = {
  oblast: keyof OblastRegion;
  city: OblastRegion[keyof OblastRegion];
  latitude?: string;
  longitude?: string;
};
export type ArrayOneOrMore<T> = {
  0: T;
} & Array<T>;
export function isArrayOneOrMore<T>(as: T[]): as is ArrayOneOrMore<T> {
  return as.length > 0;
}
export type MediaLink = {
  id: string;
  url: string;
  description?: string;
  mediaType: "image" | "video";
};
export type Media = {
  images?: MediaLink[];
  videos?: MediaLink[];
  youtube_links?: MediaLink[];
  general_links?: MediaLink[];
  main_image?: MediaLink;
};
export type Evidence = {
  _id: string;
  description: string;
  url: string;
};
export type Contributors = {
  first_name: string;
  last_name: string;
  _id: string;
  date_first_edited: Date | string;
};
export interface GeneralRecordType {
  _id: string;
  record_title: string;
  record_creation_date: Date | string;
  media?: Media;
  description: string;
  evidence: ArrayOneOrMore<Evidence>;
  contributors: Contributors[];
  score?: number;
}
export type GeneralEventType = GeneralRecordType & {
  date_first_published?: Date | string;
  date_event_occurred?: Date | string;
  address: Address;
};
