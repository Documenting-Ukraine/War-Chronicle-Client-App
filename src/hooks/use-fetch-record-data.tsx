import { RealmApp, useRealmApp } from "../realm/RealmApp";
import { useEffect, useState } from "react";
import { RecordSubmissionType } from "../types";
import { RefObject } from "react";
import {
  RecordFormSearchQuery,
  isSearchQuery,
} from "../store/reducers/recordForms/types";
import { unstable_batchedUpdates } from "react-dom";
import { fetchRecordFormData } from "../store/reducers/asyncActions/recordFormActions/fetchRecordForms";
// import { CategoriesList } from "../types/dataTypes/CategoryIconMap";
// const categories: [typeof CategoriesList[number], RecordSubmissionType[]][] =
//   CategoriesList.map((str) => [str, []]);
const defaultData: RecordSubmissionType[] = [];
/*
 *
 * When you want to fetch data but not store it in
 * the redux store
 */
const searchResults = async ({
  app,
  searchQuery,
  idxCounter,
}: {
  app: RealmApp;
  searchQuery: RecordFormSearchQuery;
  idxCounter?: number;
}) =>
  // category: typeof CategoriesList[number],
  // app: RealmApp,
  // pageNum?: number
  {
    const input = { searchQuery, idx_counter: idxCounter };

    // if (pageNum) input.searchQuery.idxCounter = pageNum;
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
const validateQuery = (searchQuery: string) => {
  let query: RecordFormSearchQuery = {};
  const parsedQuery = JSON.parse(searchQuery);
  if (isSearchQuery(parsedQuery)) query = parsedQuery;
  return query;
};
const useFetchRecordData = ({
  pagination,
  searchQuery,
}: {
  pagination?: boolean;
  searchQuery: string;
}) => {
  const app = useRealmApp();
  //holds all searched data that can be looked up with a key
  const [data, setData] = useState(defaultData);
  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading"
  );
  const [pageNum, setPageNum] = useState(0);
  const nextPagination = async (e: HTMLElement) => {
    if (status === "loading") return;
    const elHeight = e.offsetHeight 
    
    setStatus("loading");
    try {
      const result = await searchResults({
        app,
        searchQuery: validateQuery(searchQuery),
        idxCounter: pageNum + 1,
      });
      unstable_batchedUpdates(() => {
        setData((data) => [...data, ...result]);
        setStatus("success");
        setPageNum((state) => state + 1);
      });
    } catch (e) {
      console.error(e);
      console.trace();
      setStatus("failed");
    }
  };
  //on mount
  useEffect(() => {
    //fetch all data
    setStatus("loading");
    try {
      searchResults({
        app,
        searchQuery: validateQuery(searchQuery),
        idxCounter: 0,
      })
        .then((data) => {
          unstable_batchedUpdates(() => {
            setData(data);
            setStatus("success");
          });
        })
        .catch((e) => {
          setStatus("failed");
          console.error(e);
        });
    } catch (e) {
      setStatus("failed");
      console.trace();
    }
  }, [app, searchQuery]);
  return { data, status, setData, setStatus, nextPagination };
};
export default useFetchRecordData;
