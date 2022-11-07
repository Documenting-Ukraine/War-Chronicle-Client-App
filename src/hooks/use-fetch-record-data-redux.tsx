import { useEffect, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { RecordSubmissionType } from "../types";
import { RealmApp } from "../realm/RealmApp";
import { isFetchRecordFormsResult } from "../store/reducers/asyncActions/recordFormActions/fetchRecordForms";
export const fetchPageData = async (
  recordId: string | undefined,
  app: RealmApp
) => {
  if (!recordId) throw Error("Invalid record id");
  const input = {
    searchQuery: {
      _ids: [recordId],
    },
  };
  const data = await app.currentUser?.callFunction(
    "search_records_public",
    input
  );
  if (isFetchRecordFormsResult(data) && data.results && data.results.length > 0)
    return data.results[0];
  else throw Error("Could not find the record");
};
export const useFetchRecordData = ({
  app,
  recordId,
}: {
  app: RealmApp;
  recordId: string;
}) => {
  const [data, setData] = useState<RecordSubmissionType | null>(null);
  const [loading, setLoading] = useState<"loading" | "failed" | "fullfilled">(
    "loading"
  );
  const [err, setErr] = useState({ err: false, message: "" });

  useEffect(() => {
    fetchPageData(recordId, app)
      .then((payload) => {
        unstable_batchedUpdates(() => {
          setData(payload);
          setLoading("fullfilled");
        });
      })
      .catch((e) => {
        console.error(e);
        unstable_batchedUpdates(() => {
          setErr({ err: true, message: e.message });
          setLoading("failed");
        });
      });
  }, [app, recordId]);
  return {
    data,
    loading,
    err,
  };
};
export default useFetchRecordData;
