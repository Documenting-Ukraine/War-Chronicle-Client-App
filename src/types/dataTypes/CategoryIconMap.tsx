import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";
import {
  faEarthAmericas,
  faFlag,
  faHandcuffs,
  faPeopleGroup,
  faTents,
} from "@fortawesome/free-solid-svg-icons";
export const CategoriesList = [
  "War Crimes",
  "Refugees And IDPs",
  "Protest Abroad",
  "International Response",
  "Media and Disinformation",
  "Russia"
] as const;
export type GenericCategoryMap<T> = {
  [key in typeof CategoriesList[number]]: T;
};
export type CategoryIconProps = GenericCategoryMap<IconProp>;
export function isCategoryScope(
  arg: any
): arg is typeof CategoriesList[number] {
  if (!arg) return false;
  return arg in categoryIconMap;
}
const categoryIconMap: CategoryIconProps = {
  "War Crimes": faHandcuffs,
  "Refugees And IDPs": faTents,
  "Protest Abroad": faPeopleGroup,
  "International Response": faEarthAmericas,
  "Media and Disinformation": faNewspaper,
  "Russia": faFlag,
};
export const categoryPermissions: GenericCategoryMap<boolean> = {
  "War Crimes": false,
  "Refugees And IDPs": false,
  "Protest Abroad": false,
  "International Response": false,
  "Media and Disinformation": false,
  "Russia": false
}
export default categoryIconMap;
