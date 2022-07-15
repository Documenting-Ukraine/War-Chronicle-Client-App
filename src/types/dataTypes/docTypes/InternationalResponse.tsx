import { GeneralRecordType } from "../GeneralRecordType";
import {
  isInList,
  InternationalResponseType,
  BooleanDropdownOptions,
} from "../DataLists";

export const isInternationalType = (
  e: string
): e is typeof InternationalResponseType[number] =>
  isInList(e, InternationalResponseType);
type GeneralInternational = GeneralRecordType & {
  record_type: "International Response";
  participating_countries: string[];
};
type UNRecord = GeneralInternational & {
  international_response_type: "United Nations Resolution";
  resolution_name: string;
};
type CombatPermission = GeneralInternational & {
  international_response_type: "Combat Permission";
  permission_granted_to_citizens?: typeof BooleanDropdownOptions[number];
  num_of_volunteers?: number;
  date_permission_granted: Date | string;
};
type Aid = {
  aid_sent: typeof BooleanDropdownOptions[number];
  aid_recipient: string;
  date_aid_is_announced: Date | string;
  date_aid_is_sent: Date | string;
  aid_valuation: number;
  sub_aid_types: string;
};
type MilitaryAid = GeneralInternational &
  Aid & {
    international_response_type: "Military Aid";
    general_aid_type: "military";
  };
type HumanitarianAid = GeneralInternational &
  Aid & {
    international_response_type: "Humanitarian Aid";
    general_aid_type: "humanitarian";
  };

type InternationalResponse =
  | UNRecord
  | CombatPermission
  | MilitaryAid
  | HumanitarianAid;
export type {
  UNRecord,
  CombatPermission,
  MilitaryAid,
  HumanitarianAid,
  GeneralInternational,
  InternationalResponse,
};
