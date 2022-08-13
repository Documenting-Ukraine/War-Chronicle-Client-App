import { RecordSubmissionType } from "../../types";
import { Link } from "react-router-dom";
import { RealmApp, useRealmApp } from "../../realm/RealmApp";
import { replaceSpacesWithDash } from "../../helperFunctions/replaceSpacesWithDash";
import { isUserCustomData } from "../../types/dataTypes";
import { CategoriesList } from "../../types/dataTypes/CategoryIconMap";
import { isItemInList } from "../../types/dataTypes/DataLists";
const validateUserEdit = (app: RealmApp, validateCategories: string[]) => {
  if (!app.currentUser) return false;
  const data = app.currentUser.customData;
  if (!isUserCustomData(data)) return false;
  const { account_type: accountType, category_scopes: categories } = data;
  if (accountType === "admin") return true;
  else if (accountType === "contributor") {
    return validateCategories.every((el) => {
      if (isItemInList<typeof CategoriesList[number]>(el, CategoriesList))
        return categories && categories.includes(el);
      else return false;
    });
  } else return false;
};
const RecordContentPage = ({ data }: { data: RecordSubmissionType }) => {
  const app = useRealmApp();
  const namespace = "record-pg";
  const updateRoute = replaceSpacesWithDash(data.record_type.toLowerCase());
console.log(app)
  return (
    <div id={`${namespace}-record-content`}>
      {validateUserEdit(app, [data.record_type]) && (
        <Link
          to={`dashboard/${
            app.currentUser?.id
          }/forms/${`update-record-${updateRoute}`}/${data._id}`}
        >
          Edit Record
        </Link>
      )}
    </div>
  );
};
export default RecordContentPage;
