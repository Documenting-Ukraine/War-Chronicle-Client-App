import { GeneralEventType, GeneralRecordType } from "../GeneralRecordType";
import {
  ResponseType,
  isInList,
  SanctionType,
  RussianRecordTypes,
} from "../DataLists";

export const isRussianRecordType = (
  e: string
): e is typeof RussianRecordTypes[number] => isInList(e, RussianRecordTypes);
type RussiaGeneral = GeneralRecordType & {
  record_type: "Russia";
  notes: string;
};

type Sanctions = RussiaGeneral & {
  russian_record_type: "Sanctions vs. Russia",
  countries: string[];
  sanction_type: typeof SanctionType[number];
  sanction_name?: string;
};
type Corporations = RussiaGeneral & {
  russian_record_type: "Corporation Responses",
  corporation_name: string;
  russian_record_response_type: typeof ResponseType[number];
  russian_record_custom_response_type?: string;
  corporation_industry: string;
  date_of_first_response: Date | string;
  date_of_most_recent_response: Date | string;
  donation_valuation?: number;
};
export const SportsAndCultureResponses = [
  ...ResponseType,
  "Banning of Players from Aggressor Countries",
  "Honoring Soldiers or Players",
] as const;
export const isSportsResponseType = (
  e: string
): e is typeof SportsAndCultureResponses[number] =>
  isInList(e, SportsAndCultureResponses);
type SportsAndCulture = RussiaGeneral & {
  russian_record_type: "Sports and Culture Responses",
  organization_name: string;
  date_of_announcement: Date | string;
  organization_type: string;
  russian_record_response_type: typeof SportsAndCultureResponses[number];
  russian_record_custom_response_type?: string;
  donation_valuation?: number;
};

type ProtestsInRussia = RussiaGeneral &
  GeneralEventType & {
    russian_record_type: "Protests in Russia",
    num_of_protesters?: number;
    num_of_arrests?: number;
    num_of_hospitalizations?: number;
    state_response?: string;
  };
type Russia = Corporations | SportsAndCulture | Sanctions | ProtestsInRussia;

export type { RussiaGeneral, Russia };
