import { GeneralRecordType } from "./GeneralRecordType";
const Monument = [] as const;
const KeyActor = [] as const;
const Embassies = [] as const;
const WarCrime = [] as const;

  


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
