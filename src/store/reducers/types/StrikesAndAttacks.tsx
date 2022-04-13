import { GeneralEventType } from "./GeneralRecordType";
import {CivilianInfastructure} from "./DataLists"
type StrikesAndAttacksGeneral = GeneralEventType & {
  recordType: "Strikes And Attacks";
  civilianCasualties?: number;
  ukrCasualties?: number;
  rfCasualities?: number;
  civilianInfastructure: typeof CivilianInfastructure
};
type Strikes = StrikesAndAttacksGeneral
type Attacks = StrikesAndAttacksGeneral & {
    rfPOWs: number;
    ukrPOWs: number;
}
type StrikesAndAttacks = Strikes | Attacks
export type { Strikes, Attacks, StrikesAndAttacks}
