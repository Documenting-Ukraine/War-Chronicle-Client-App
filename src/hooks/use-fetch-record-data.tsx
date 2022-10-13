import { useRealmApp } from "../realm/RealmApp";
import { useEffect, useState } from "react";
import { CategoriesList } from "../types/dataTypes/CategoryIconMap";
import { RecordSubmissionType } from "../types";
import { RecordFormSearchQuery } from "../store/reducers/recordForms/types";
import { unstable_batchedUpdates } from "react-dom";
import { fetchRecordFormData } from "../store/reducers/asyncActions/recordFormActions/fetchRecordForms";
const categories: [typeof CategoriesList[number], RecordSubmissionType[]][] =
  CategoriesList.map((str) => [str, []]);
const defaultData = Object.fromEntries(categories);
/*
 *
 * When you want to fetch data but not store it in
 * the redux store
 */
const useFetchRecordData = () => {
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
  return { data, status, setData, setStatus };
};
export default useFetchRecordData;
