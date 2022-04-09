import { GeneralRecordType } from "./GeneralRecordType";
const CivilianInfastructure = [] as const;
type StrikesAndAttacksGeneral = GeneralRecordType & {
  civilianCasualties?: number;
  ukrCasualties?: number;
  rfCasualities?: number;
  civilianInfastructure: typeof CivilianInfastructure[]
};
type Strikes = StrikesAndAttacksGeneral
type Attacks = StrikesAndAttacksGeneral & {
    rfPOWs: number;
    ukrPOWs: number;
}
type StrikesAndAttacks = Strikes | Attacks
export type { Strikes, Attacks, StrikesAndAttacks}
