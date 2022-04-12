import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import categoryIconMap from "./CategoryIconMap";

const contributeActionCardData = (user: Realm.User) => {
  const accountType = user.customData?.account_type;
  //const categories = user.customData?.categories;
  const categories = ["Strikes and Attacks", "War Crimes"];
  if (!Array.isArray(categories) || typeof accountType !== "string") return [];
  const cardData = categories.map((category) => {
    return {
      additionalRoute: `forms/create-new-${category}`,
      cardIcon: categoryIconMap[category]
        ? categoryIconMap[category]
        : faFileLines,
      cardHeading: `New ${category}`,
      cardDescription: `Create a new record for ${category}`,
    };
  });
  return cardData;
};

export default contributeActionCardData;
