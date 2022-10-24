import { RealmApp, useRealmApp } from "../realm/RealmApp";
import { useEffect, useState, useMemo } from "react";
import { RecordSubmissionType } from "../types";
import {
  RecordFormSearchQuery,
  isSearchQuery,
} from "../store/reducers/recordForms/types";
import { unstable_batchedUpdates } from "react-dom";
import { fetchRecordFormData } from "../store/reducers/asyncActions/recordFormActions/fetchRecordForms";
import { debounce } from "lodash";
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
}) => {
  const input = { searchQuery, idx_counter: idxCounter };
  try {
    const data = await fetchRecordFormData({ app, input });
    if (!data) return { paginationEnd: false, results: [] };
    if (!data.results)
      return { paginationEnd: data.pagination_end, results: [] };
    return { paginationEnd: data.pagination_end, results: data.results };
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
const scrollEventBottom = (e: React.UIEvent<HTMLElement, UIEvent>) => {
  const el = e.target as HTMLDivElement;
  //we take the height of the last element, and load the new items when we
  // reach the last item to have a smoother pagination experience
  const childEl = el.lastChild as HTMLAnchorElement;
  const childHeight = childEl.offsetHeight;
  //ignore all events that happens prior to this
  return el.scrollTop === 0 || el.offsetHeight - childHeight > el.scrollTop;
};
const nextPagination = async ({
  app,
  e,
  searchQuery,
  paginationEnd,
  pageNum,
  status,
  pagination,
  setStatus,
  setData,
  setPageNum,
  setPaginationEnd,
}: {
  app: RealmApp;
  searchQuery: string;
  paginationEnd?: boolean;
  pageNum: number;
  status?: "loading" | "success" | "failed";
  pagination?: boolean;
  e?: React.UIEvent<HTMLElement, UIEvent>;
  setStatus: React.Dispatch<
    React.SetStateAction<"loading" | "success" | "failed">
  >;
  setData: React.Dispatch<React.SetStateAction<RecordSubmissionType[]>>;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  setPaginationEnd: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  if (!pagination) return;
  if (status === "loading") return;
  if (paginationEnd) return;
  //only perform this if a scroll event is passed
  if (e && scrollEventBottom(e)) return;
  setStatus("loading");
  try {
    const result = await searchResults({
      app,
      searchQuery: validateQuery(searchQuery),
      idxCounter: pageNum + 1,
    });
    unstable_batchedUpdates(() => {
      setData((data: RecordSubmissionType[]) => [...data, ...result.results]);
      setPageNum((state: number) => state + 1);
      setPaginationEnd(result.paginationEnd);
      setStatus("success");
    });
    return result;
  } catch (err) {
    console.error(err);
    console.trace();
    setStatus("failed");
  }
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
  const [paginationEnd, setPaginationEnd] = useState(false);
  const debouncedNextPagination = useMemo(
    () =>
      debounce(
        (e?: React.UIEvent<HTMLElement, UIEvent>) =>
          nextPagination({
            e,
            app,
            searchQuery,
            paginationEnd,
            pageNum,
            status,
            pagination,
            setStatus,
            setData,
            setPageNum,
            setPaginationEnd,
          }),
        150
      ),
    [paginationEnd, pageNum, status, pagination, app, searchQuery]
  );

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
            setData(data.results);
            setStatus("success");
            if (pagination) setPaginationEnd(data.paginationEnd);
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
  }, [app, searchQuery, pagination]);
  return {
    data,
    status,
    setData,
    setStatus,
    nextPagination,
    debouncedNextPagination,
    paginationEnd,
  };
};
export default useFetchRecordData;
