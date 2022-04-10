import { GeneralRecordType } from "./GeneralRecordType";
import {CivilianInfastructure} from "./DataLists"
type StrikesAndAttacksGeneral = GeneralRecordType & {
  civilianCasualties?: number;
  ukrCasualties?: number;
  rfCasualities?: number;
  civilianInfastructure: Array<typeof CivilianInfastructure[]>
};
type Strikes = StrikesAndAttacksGeneral
type Attacks = StrikesAndAttacksGeneral & {
    rfPOWs: number;
    ukrPOWs: number;
}
type StrikesAndAttacks = Strikes | Attacks
export type { Strikes, Attacks, StrikesAndAttacks}
