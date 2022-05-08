import {
  GeneralRecordType,
  ArrayOneOrMore,
  MediaLink,
} from "./GeneralRecordType";
import {Countries, AidTypes} from "./DataLists"
type GeneralInternational = GeneralRecordType & {
  record_type: "International Response"
  countries: typeof Countries[number][];
  record_creation_date: Date | string;
}
type UNRecord = GeneralInternational & {
  resolution: {
    name: string;
    link: string;
  };
};
type CombatPermission = GeneralInternational & {
  permissionGrantedToCitizens?: boolean;
  numberOfVolunteers?: number;
  dateGranted: Date;
};
type MilitaryAid = GeneralInternational & {
  aidSent: boolean;
  recipient: string;
  aidTypes: typeof AidTypes[number][];
  dateAidIsAnnounced: Date;
  dateAidIsSent: Date;
  aidValuation: number;
  evidence: ArrayOneOrMore<Omit<MediaLink, "localURL">>;
  notes: string
};
type HumanitarianAid = MilitaryAid & { secondaryPackage: string }

type InternationalResponse = UNRecord | CombatPermission | MilitaryAid
export type {
  UNRecord,
  CombatPermission,
  MilitaryAid,
  HumanitarianAid,
  GeneralInternational,
  InternationalResponse
};
