import { GeneralRecordType } from "../GeneralRecordType";
import {
  ResponseType,
  Countries,
} from "../DataLists";
type RussiaGeneral = GeneralRecordType & {
  record_type: "Russia";
  notes: string;
};
type Sanctions = RussiaGeneral & {
  countries: typeof Countries[number][];
  sanctions: boolean;
  swift: boolean;
  russianCB: boolean;
  individuals: boolean;
};
type Corporations = RussiaGeneral & {
  corporation: string;
  responseType: typeof ResponseType[number];
  corporationIndustry: string;
  dateOfFirstResponse: Date;
  dateMostRecentReponse: Date;
  donationValuation?: number;
};
type SportsAndCulture = RussiaGeneral & {
  organization: string;
  dateOfAnnouncement: Date;
  organizationCategory: string;
  responseType: typeof ResponseType[number];
};

type ProtestsInRussia = RussiaGeneral & {};
type Russia = Corporations | SportsAndCulture | Sanctions | ProtestsInRussia;

export type { RussiaGeneral, Russia };
