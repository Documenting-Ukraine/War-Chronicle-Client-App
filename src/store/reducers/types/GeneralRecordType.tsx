const Region = [] as const;
const Oblast = [] as const;
const City = [] as const;
const Munition = [] as const;
type ArrayOneOrMore<T> = {
  0: T;
} & Array<T>;
type MediaLink = {
  localURL: string;
  thirdPartyURL: string;
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
    latitude: string;
    longitude: string;
  };
  media: {
    images: ArrayOneOrMore<MediaLink>;
    videos: MediaLink[];
    mainImage?: MediaLink;
  };
  description: string;
}
export type { GeneralRecordType };
