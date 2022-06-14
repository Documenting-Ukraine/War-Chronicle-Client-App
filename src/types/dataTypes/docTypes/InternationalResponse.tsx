import { GeneralRecordType } from "../GeneralRecordType";
import { Countries, AidTypes, isInList, InternationalResponseType } from "../DataLists";

export const isInternationalType = (
  e: string
): e is typeof InternationalResponseType[number] =>
  isInList(e, InternationalResponseType);
type GeneralInternational = GeneralRecordType & {
  record_type: "International Response";
  response_type: typeof InternationalResponseType[number];
  countries: typeof Countries[number][];
};
type UNRecord = GeneralInternational & {
  resolution: string;
};
type CombatPermission = GeneralInternational & {
  permission_granted_to_citizens?: boolean;
  number_of_volunteers?: number;
  date_permission_granted: Date | string;
};
type Aid = {
  general_aid_type: typeof AidTypes[number]
  aid_sent: boolean;
  recipient: string;
  date_aid_is_announced: Date | string;
  date_aid_is_sent: Date | string;
  aid_valuation: number;
  sub_aid_types: string;
};
type MilitaryAid = GeneralInternational &
  Aid & {
    general_aid_type: "military";
  };
type HumanitarianAid = GeneralInternational &
  Aid & {
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
