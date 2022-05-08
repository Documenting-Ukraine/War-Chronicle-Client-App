import { OblastRegion } from "./OblastRegionType";
type address = {
  oblast: keyof OblastRegion;
  city: OblastRegion[keyof OblastRegion];
  latitude?: string;
  longitude?: string;
};
type ArrayOneOrMore<T> = {
  0: T;
} & Array<T>;
type MediaLink = {
  local_url: string;
  media_type: string;
  third_party_url?: string;
  description?: string;
};
type Media = {
  images?: ArrayOneOrMore<MediaLink>;
  videos?: ArrayOneOrMore<MediaLink>;
  main_image?: MediaLink;
};
interface GeneralRecordType {
  _id: string;
  record_title: string;
  record_creation_date: Date | string;
  media?: Media;
  description: string;
  evidence: ArrayOneOrMore<{
    description: string;
    url: string;
  }>;
  additional_evidence?: {
    description: string;
    url: string;
  }[];
}
type GeneralEventType = GeneralRecordType & {
  date_first_published: Date | string;
  //timeRecorded?
  date_event_occured: Date | string;
  address?: address;
};
export type {
  GeneralRecordType,
  GeneralEventType,
  ArrayOneOrMore,
  MediaLink,
  Media,
};
