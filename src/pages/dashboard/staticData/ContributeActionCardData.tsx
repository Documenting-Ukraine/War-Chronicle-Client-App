import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faFileLines, faFolder } from "@fortawesome/free-solid-svg-icons";
import { isUserCustomData } from "../../../types/dataTypes";
import categoryIconMap from "../../../types/dataTypes/CategoryIconMap";
import {isCategoryScope} from "../../../types/dataTypes/CategoryIconMap";

const contributeActionCardData = (user: Realm.User) => {
  const customData = user.customData
  if (!isUserCustomData(customData)) return [];
  const accountType = customData?.account_type;
  const userCategories = customData?.category_scopes;
  const allCategories = Object.keys(categoryIconMap);
  
  if (!Array.isArray(userCategories) && accountType !== "admin") return [];
  const categoryList =
    accountType === "admin"
      ? allCategories
      : Array.isArray(userCategories)
      ? userCategories
      : [];
  const categoryCardData = categoryList.map((category) => {
    //this is for routing, as urls cannot have spaces
    const newCategory = category.replace(/ /g, "-").toLowerCase()
    return {
      additionalRoute: `forms/create-new-${newCategory}`,
      cardIcon:
        isCategoryScope(category) ? categoryIconMap[category] : faFileLines,
      cardHeading: `New ${category}`,
      cardDescription: `Create a new record for ${category}`,
    };
  });
  const userContributions = {
    additionalRoute: `all-contributions`,
    cardIcon: faPenToSquare,
    cardHeading: `Your Contributors`,
    cardDescription: `Delete or update your existing contributions`,
  };
  const findContributions =
    accountType === "admin"
      ? [
          {
            additionalRoute: `search-contributions`,
            cardIcon: faFolder,
            cardHeading: `Find Contributions`,
            cardDescription: `Search through the contributions of others, to update or delete them.`,
          },
        ]
      : [];
  return [userContributions, ...findContributions, ...categoryCardData];
};

export default contributeActionCardData;
