import { GeneralRecordType } from "./GeneralRecordType";
import {
  ResponseType,
  Countries,
  CorporationIndustry,
  OrganizationType,
} from "./DataLists";
type RussiaGeneral = GeneralRecordType & {
  notes: string;
};
type Sanctions = RussiaGeneral & {
  countries: typeof Countries;
  sanctions: boolean;
  swift: boolean;
  russianCB: boolean;
  individuals: boolean;
};
type Corporations = RussiaGeneral & {
  corporation: string;
  responseType: typeof ResponseType;
  corporationIndustry: typeof CorporationIndustry;
  dateOfFirstResponse: Date;
  dateMostRecentReponse: Date;
  donationValuation?: number;
};
type SportsAndCulture = {
  organization: string;
  dateOfAnnouncement: Date;
  organizationCategory: typeof OrganizationType;
  responseType: typeof ResponseType;
};

type ProtestsInRussia = {};
type Russia = Corporations | SportsAndCulture | Sanctions | ProtestsInRussia;

export type { RussiaGeneral, Russia };
