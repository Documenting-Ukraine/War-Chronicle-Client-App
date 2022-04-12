import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";
import { faRocket, faEarthAmericas, faFireFlameCurved, faFlag, faHandcuffs, faPeopleGroup, faTents } from "@fortawesome/free-solid-svg-icons";

interface CategoryIconProps {
    [key: string] : IconProp
}
const categoryIconMap: CategoryIconProps = {
    "War Crimes": faHandcuffs,
    "Strikes and Attacks": faRocket,
    "Refugees And Idps": faTents,
    "Protest Abroad": faPeopleGroup,
    "Environmental Terrorism": faFireFlameCurved,
    "International Response": faEarthAmericas,
    "Media and Disinformation": faNewspaper,
    "Russia": faFlag
};
export default categoryIconMap;
