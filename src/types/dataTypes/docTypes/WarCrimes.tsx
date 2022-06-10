import { GeneralEventType } from "../GeneralRecordType";
import { isInList, WarCrimeTypes } from "../DataLists";
import { ReadonlyArray } from "../DataLists";
//War Crimes
export const munitionTypeList = [
  "Mine, Booby-Trap or Other Device",
  "Blinding Laser Weapon",
  "Weapons that injures by fragment",
  "Bullets that expand or flatten in the human body",
  "Poisonous gas",
  "Incendiary Weapon",
  "Cluster Bomb",
  "Biological Weapon",
  "Chemical Weapon",
  "Explosive Object weighing less than 400 grams",
] as const;
export const isMunitionType = (
  e: string
): e is typeof munitionTypeList[number] => isInList(e, munitionTypeList);

export const MunitionMineList = [
  "Banned mine",
  "Anti-personnel mine",
  "Booby-Trap",
  "Remotely-delivered mine",
  "Other type of device",
] as const;
const MunitionMineListTypes = MunitionMineList as ReadonlyArray<string>;
export const isMunitionMineType = (
  e: string
): e is typeof MunitionMineList[number] => {
  try {
    return MunitionMineListTypes.includes(e);
  } catch (a) {
    return false;
  }
};
export const munitionType = (
  title: typeof munitionTypeList[number],
  subTypes?: typeof MunitionMineList[number]
) => {
  if (subTypes)
    return {
      munition_type: title,
      sub_types: subTypes,
    };
  else return { munition_type: title };
};

export const munitionMinesArr = () =>
  MunitionMineList.map((string) =>
    munitionType("Mine, Booby-Trap or Other Device", string)
  );
export const Munition = [
  ...munitionMinesArr(),
  munitionType("Blinding Laser Weapon"),
  munitionType("Weapons that injures by fragment"),
  munitionType("Bullets that expand or flatten in the human body"),
  munitionType("Poisonous gas"),
  munitionType("Incendiary Weapon"),
  munitionType("Cluster Bomb"),
  munitionType("Biological Weapon"),
  munitionType("Chemical Weapon"),
  munitionType("Explosive Object weighing less than 400 grams"),
] as const;
export const LandmarkSignificance = ["National", "Local"];
export const LandmarksTypes = [
  "Archaeological",
  "Historical",
  "Monumental Art",
  "Architecture and Urban Planning",
  "Garden-park artistry",
  "Historical Landscape",
  "Science and Technology",
] as const;
export const landmarksType = (
  significance: typeof LandmarkSignificance[number],
  type: typeof LandmarksTypes[number]
) => {
  return {
    landmark_significance: significance,
    landmark_type: type,
  };
};
const landMarksArr = (significance: typeof LandmarkSignificance[number]) =>
  LandmarksTypes.map((string) => landmarksType(significance, string));
export const Landmarks = [
  ...landMarksArr("National"),
  ...landMarksArr("Local"),
] as const;
export const KeyActor = ["Private", "Public", "Mixed"] as const;
export const ObjectsOfCulture = [
  "Building",
  "Monument",
  "Landscape",
  "Landmark",
  "Work of Art",
] as const;
export const isObjectOfCulture = (
  e: string
): e is typeof ObjectsOfCulture[number] => isInList(e, ObjectsOfCulture);
type GeneralWarCrimes = GeneralEventType & {
  record_type: "War Crimes";
  war_crime: typeof WarCrimeTypes[number];
  civilian_casualties?: number;
};
type AttacksOnCivilians = GeneralWarCrimes & {
  munition: typeof Munition[number];
};

type DestructionOfCulture = GeneralWarCrimes & {
  key_actor: typeof KeyActor[number];
  // landmark?: typeof Landmarks[number];
  objects_of_culture: typeof ObjectsOfCulture[number];
};

type WarCrimes = AttacksOnCivilians | DestructionOfCulture;

export type { WarCrimes, AttacksOnCivilians, DestructionOfCulture };
