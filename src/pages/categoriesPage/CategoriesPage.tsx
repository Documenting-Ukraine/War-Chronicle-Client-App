import { useRealmApp } from "../../realm/RealmApp";
import RecentList from "../utilityComponents/recentList/RecentList";
import { CategoriesList } from "../../types/dataTypes/CategoryIconMap";
import { useEffect, useState } from "react";
import { RecordSubmissionType } from "../../types";
import { fetchRecordFormData } from "../../store/reducers/asyncActions/recordFormActions/fetchRecordForms";
import { RecordFormSearchQuery } from "../../store/reducers/recordForms/types";
import { unstable_batchedUpdates } from "react-dom";
import { Link } from "react-router-dom";

const categories: [typeof CategoriesList[number], RecordSubmissionType[]][] =
  CategoriesList.map((str) => [str, []]);
const defaultData = Object.fromEntries(categories);
const namespace = "categories-pg";
const CategoriesPage = () => {
  const app = useRealmApp();
  //holds all searched data that can be looked up with a key
  const [data, setData] = useState(defaultData);
  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading"
  );
  useEffect(() => {
    const searchResults = async (category: typeof CategoriesList[number]) => {
      const input: { searchQuery: RecordFormSearchQuery } = {
        searchQuery: {
          categories: [category],
          sortBy: "newest_creation_date",
        },
      };
      try {
        const data = await fetchRecordFormData({ app, input });
        if (!data) return [];
        if (!data.results) return [];
        const results = data.results;
        return results;
      } catch (e) {
        console.trace();
        throw e;
      }
    };
    //fetch all data
    setStatus("loading");
    const results = CategoriesList.map((category) => searchResults(category));
    Promise.all(results)
      .then((data) => {
        const newStateArray = data.map((result, idx) => [
          CategoriesList[idx],
          result,
        ]);
        unstable_batchedUpdates(() => {
          setData(Object.fromEntries(newStateArray));
          setStatus("success");
        });
      })
      .catch((e) => {
        setStatus("failed");
        console.error(e);
      });
  }, [app]);
  return (
    <div className={namespace}>
      <div className={`${namespace}-container`}>
        {CategoriesList.map((category) => {
          const contributeLink = `/dashboard/${
            app?.currentUser?.id
          }/forms/create-new-${category.replace(/ /g, "-").toLowerCase()}`;
          const dataEmpty = data[category].length > 0;
          return (
            <div key={category} className={`${namespace}-category-list`}>
              <RecentList
                headerText={category}
                loadingState={status}
                contributionsData={data[category]}
                contributeNowLink={contributeLink}
                bannerStyles={
                  dataEmpty
                    ? {
                        borderBottomLeftRadius: "0",
                        borderBottomRightRadius: "0",
                      }
                    : undefined
                }
              />
              {dataEmpty && (
                <div className={`${namespace}-contribute-link`}>
                  <Link to={contributeLink}>Contribute Now</Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CategoriesPage;
