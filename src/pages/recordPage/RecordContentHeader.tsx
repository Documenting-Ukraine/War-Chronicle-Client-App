import { RecordSubmissionType } from "../../types";
import { Link } from "react-router-dom";
import { RealmApp } from "../../realm/RealmApp";
import { replaceSpacesWithDash } from "../../helperFunctions/replaceSpacesWithDash";
import { isUserCustomData } from "../../types/dataTypes";
import { CategoriesList } from "../../types/dataTypes/CategoryIconMap";
import { isItemInList } from "../../types/dataTypes/DataLists";
import useWindowWidth from "../../hooks/use-window-width";
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
const RecordContentHeader = ({
  data,
  namespace,
  app,
}: {
  app: RealmApp;
  namespace: string;
  data: RecordSubmissionType;
}) => {
  const smallWidth = useWindowWidth(576);
  const updateRoute = replaceSpacesWithDash(data.record_type.toLowerCase());
  const contributors = data.contributors ? data.contributors.reduce(
    (a, b) => `${a}, ${`${b.first_name} ${b.last_name}`}`,
    ""
  ) : "";
  const addedOnEl = (
    <div id={`${namespace}-heading-date-created`}>
      Added on{" "}
      {data.record_creation_date.toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })}
    </div>
  );
  return (
    <>
      <div className={`${namespace}-content-header`}>
        <h1>
          <span>Id:</span>
          <span>{" " + data._id.toString()}</span>
        </h1>
        {validateUserEdit(app, [data.record_type]) && (
          <Link
            to={`/dashboard/${
              app.currentUser?.id
            }/forms/${`update-record-${updateRoute}`}/${data._id}`}
          >
            Edit Record
          </Link>
        )}
      </div>
      <div className={`${namespace}-heading`}>
        <div className={`${namespace}-heading-row`}>
          {!smallWidth && addedOnEl}
          <div id={`${namespace}-heading-record-type`}>
            <h3>Type: </h3>
            <span>{data.record_type}</span>
          </div>
          {smallWidth && addedOnEl}
        </div>
        <div id={`${namespace}-heading-contributors`}>
          <h3>Contributors:</h3>
          <span>{contributors.substring(1, contributors.length)}</span>
        </div>
      </div>
    </>
  );
};
export default RecordContentHeader;
