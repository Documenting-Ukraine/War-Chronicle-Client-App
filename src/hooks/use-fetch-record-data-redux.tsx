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
// const useTestFetchRecordData = ({
//   app,
//   recordId,
// }: {
//   app: RealmApp;
//   recordId: string;
// }) => {
//   const [loading, setLoading] = useState<"loading" | "failed" | "fullfilled">(
//     "fullfilled"
//   );
//   const [err, setErr] = useState({ err: false, message: "" });
//   const [data, setData] = useState<RecordSubmissionType | null>({
//     _id: "434353",
//     record_type: "War Crimes",
//     record_title: "War Crimes",
//     war_crime: "Destruction of Culture",
//     contributors: [
//       {
//         first_name: "Arky",
//         last_name: "Asmal",
//         _id: "ewrw4t",
//         date_first_edited: new Date(),
//       },
//     ],
//     media:{
//       images: ["image.png", "image.png", "image.png", "image.png"],
//       videos: ["video.mp4", "video1.mp4"]
//     },
//     key_actor: {
//       actor_type: "Private",
//       actor_name: "The world",
//     },
//     record_creation_date: new Date(),
//     date_first_published: new Date(),
//     date_event_occurred: new Date(),
//     address: {
//       oblast: "Cherkasy",
//       city: "Alchevsk",
//     },
//     description:
//       "New world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world Test, New world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world TestNew world Test",
//     evidence: [
//       {
//         _id: "rt4gt4t",
//         description: "Hello",
//         url: "Cool beans",
//       },
//     ],
//     objects_of_culture: {
//       object_type: "Landmark",
//       object_name: "The end of time",
//       landmark: {
//         landmark_type: "Archaeological",
//         landmark_significance: "The End ",
//       },
//     },
//   });
//   return {
//     data,
//     loading,
//     err,
//   };
// };
// export default useTestFetchRecordData
export default useFetchRecordData;
/* Real logic

*/
