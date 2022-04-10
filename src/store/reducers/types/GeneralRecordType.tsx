import {Region, Oblast, City, Munition} from "./DataLists"
type ArrayOneOrMore<T> = {
  0: T;
} & Array<T>;
type MediaLink = {
  localURL: string;
  thirdPartyURL?: string;
  description?: string
};
type Media = {
  images?: ArrayOneOrMore<MediaLink>;
  videos?: ArrayOneOrMore<MediaLink>;
  mainImage?: MediaLink;
};
interface GeneralRecordType {
  dateOfEvent: Date;
  recordCreationDate: Date;
  //dateRecorded?
  //timeRecorded?
  address: {
    region: typeof Region[number];
    oblast: typeof Oblast[number];
    city: typeof City[number];
    munition: typeof Munition[number];
    latitude?: string;
    longitude?: string;
  };
  media?: Media
  description: string;
}
export type { GeneralRecordType, ArrayOneOrMore, MediaLink, Media };
