import { GeneralRecordType } from "../GeneralRecordType";
import { Countries, AidTypes } from "../DataLists";
type GeneralInternational = GeneralRecordType & {
  record_type: "International Response";
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
  aid_sent: boolean;
  recipient: string;
  aid_types: typeof AidTypes[number][];
  date_aid_is_announced: Date;
  date_aid_is_sent: Date;
  aid_valuation: number;
};
type MilitaryAid = GeneralInternational &
  Aid & {
    general_aid_type: "military";
  };
type HumanitarianAid = GeneralInternational & Aid & {
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
