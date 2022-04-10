import { GeneralEventType } from "./GeneralRecordType";
import {WarCrimeType, Embassies, KeyActor, Monument} from "./DataLists"
 
type GeneralWarCrimes = GeneralEventType & {
  warCrime: typeof WarCrimeType[number];
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
