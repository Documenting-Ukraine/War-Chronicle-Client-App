import { GeneralEventType, GeneralRecordType } from "../GeneralRecordType";
import {
  ResponseType,
  Countries,
  isInList,
  SanctionType,
  RussianRecordTypes,
} from "../DataLists";

export const isRussianRecordType = (
  e: string
): e is typeof RussianRecordTypes[number] => isInList(e, RussianRecordTypes);
type RussiaGeneral = GeneralRecordType & {
  record_type: "Russia";
  russian_record_type: typeof RussianRecordTypes[number];
  notes: string;
};

type Sanctions = RussiaGeneral & {
  countries: typeof Countries[number][];
  sanction_type: typeof SanctionType[number][];
  sanction_name?: string;
};
type Corporations = RussiaGeneral & {
  corporation_name: string;
  response_type: typeof ResponseType[number];
  custom_response_type?: string;
  corporation_industry: string;
  date_of_first_response: Date | string;
  date_of_most_recent_response: Date | string;
  donation_valuation?: number;
};
export const SportsAndCultureResponses = [
  ...ResponseType,
  "Banning of Players from Aggressor Countries",
  "Honoring Soldiers or Players",
];
export const isSportsResponseType = (
  e: string
): e is typeof SportsAndCultureResponses[number] =>
  isInList(e, SportsAndCultureResponses);
type SportsAndCulture = RussiaGeneral & {
  organization_name: string;
  date_of_announcement: Date;
  organization_type: string;
  response_type: typeof SportsAndCultureResponses[number];
  custom_response_type?: string;
  donation_valuation?: number;
};

type ProtestsInRussia = RussiaGeneral &
  GeneralEventType & {
    num_of_protesters?: number;
    num_of_arrests?: number;
    num_of_hospitalizations?: number;
    state_response?: string;
  };
type Russia = Corporations | SportsAndCulture | Sanctions | ProtestsInRussia;

export type { RussiaGeneral, Russia };
