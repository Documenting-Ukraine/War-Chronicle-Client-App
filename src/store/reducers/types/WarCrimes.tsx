import { GeneralRecordType } from "./GeneralRecordType";
import {WarCrime, Embassies, KeyActor, Monument} from "./DataLists"

  
type GeneralWarCrimes = GeneralRecordType & {
  warCrime: typeof WarCrime[number];
  civilianCasualties?: number;
};
type AttacksOnCivilians = GeneralWarCrimes;
type DestructionOfEmbassies = GeneralWarCrimes & {
  embassyAttacked: typeof Embassies[number];
};
type DestructionOfCulture = GeneralWarCrimes & {
  keyActor: typeof KeyActor[number];
  monument: typeof Monument[number];
};

type WarCrimes =
  | AttacksOnCivilians
  | DestructionOfCulture
  | DestructionOfEmbassies;

export type {
  WarCrimes,
  AttacksOnCivilians,
  DestructionOfCulture,
  DestructionOfEmbassies,
};
