import { OblastRegion } from "./OblastRegionType";
export type address = {
  oblast: keyof OblastRegion;
  city: OblastRegion[keyof OblastRegion];
  latitude?: string;
  longitude?: string;
};
export type ArrayOneOrMore<T> = {
  0: T;
} & Array<T>;
export type MediaLink = {
  local_url: string;
  media_type: string;
  description?: string;
};
export type Media = {
  images?: ArrayOneOrMore<MediaLink>;
  videos?: ArrayOneOrMore<MediaLink>;
  main_image?: MediaLink;
};
export type Evidence = {
  description: string;
  url: string;
}
export interface GeneralRecordType {
  _id: string;
  record_title: string;
  record_creation_date: Date | string;
  media?: Media;
  description: string;
  evidence: ArrayOneOrMore<Evidence>;
  additional_evidence?: Evidence[];
} 
export type GeneralEventType = GeneralRecordType & {
  date_first_published: Date | string;
  date_event_occurred: Date | string;
  address?: address;
};

