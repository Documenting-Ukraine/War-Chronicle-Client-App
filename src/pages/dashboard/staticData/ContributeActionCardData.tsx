import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faFileLines, faFolder } from "@fortawesome/free-solid-svg-icons";
import categoryIconMap from "./CategoryIconMap";
import { CategoriesList, isCategoryScope} from "./CategoryIconMap";

const contributeActionCardData = (user: Realm.User) => {
  const accountType = user.customData?.account_type;
  const userCategories = user.customData?.categories;
  const allCategories = Object.keys(categoryIconMap);
  if (!Array.isArray(userCategories) && accountType !== "admin") return [];
  const categoryList =
    accountType === "admin"
      ? allCategories
      : Array.isArray(userCategories)
      ? userCategories
      : [];
  const categoryCardData = categoryList.map((category) => {
    return {
      additionalRoute: `forms/create-new-${category}`,
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
