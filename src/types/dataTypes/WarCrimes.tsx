import { GeneralEventType } from "./GeneralRecordType";
import { WarCrimeType } from "./DataLists";
//lists
//War Crimes
const munitionTypeList = [
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
const MunitionMineList = [
  "Banned mine",
  "Anti-personnel mine",
  "Booby-Trap",
  "Remotely-delivered mine",
  "Other type of device",
] as const;
const munitionType = (
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

const munitionMinesArr = () =>
  MunitionMineList.map((string) =>
    munitionType("Mine, Booby-Trap or Other Device", string)
  );
const Munition = [
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
const LandmarksTypes = [
  "Archaeological",
  "Historical",
  "Monumental Art",
  "Architecture and Urban Planning",
  "Garden-park artistry",
  "Historical Landscape",
  "Science and Technology",
] as const;
const landmarksType = (
  significance: "national" | "local",
  type: typeof LandmarksTypes[number]
) => {
  return {
    landmark_significance: significance,
    landmark_type: type,
  };
};
const landMarksArr = (significance: "national" | "local") =>
  LandmarksTypes.map((string) => landmarksType(significance, string));
const Landmarks = [
  ...landMarksArr("national"),
  ...landMarksArr("local"),
] as const;
const KeyActor = ["Private", "Public", "Mixed"] as const;
const ObjectsOfCulture = [
  "Building",
  "Monument",
  "Landscape",
  "Work of Art",
] as const;
type GeneralWarCrimes = GeneralEventType & {
  record_type: "War Crimes";
  war_crime: typeof WarCrimeType[number];
  civilian_casualties?: number;
};
type AttacksOnCivilians = GeneralWarCrimes & {
  munition: typeof Munition[number];
};

type DestructionOfCulture = GeneralWarCrimes & {
  key_actor: typeof KeyActor[number];
  landmarks?: typeof Landmarks[number] | undefined;
  objects_of_culture: typeof ObjectsOfCulture[number];
};

type WarCrimes = AttacksOnCivilians | DestructionOfCulture;

export type { WarCrimes, AttacksOnCivilians, DestructionOfCulture };
