import { useEffect, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { useParams } from "react-router";
import { useRealmApp } from "../../realm/RealmApp";
import { RecordSubmissionType } from "../../types";
import LoadingMessage from "../utilityComponents/loadingMessage/LoadingMessage";
import fetchPageData from "./fetchPgData";
import PageBanner from "../utilityComponents/pageBanner/PageBanner";
import RecordContentPage from "./RecordContentPage";
const RecordPage = () => {
  const namespace = "record-pg";
  const params = useParams();
  const app = useRealmApp();
  const recordId = params.id;
  //const [data, setData] = useState<RecordSubmissionType | null>(null);
  const [data, setData] = useState<RecordSubmissionType | null>({
    _id: "434353",
    record_type: "War Crimes",
    record_title: "War Crimes",
    war_crime: "Destruction of Culture",
    key_actor: {
      actor_type: "Private",
      actor_name: "The world",
    },
    record_creation_date: new Date(),
    date_first_published: new Date(),
    date_event_occurred: new Date(),
    address: {
      oblast: "Cherkasy",
      city: "Alchevsk",
    },
    description: "New world Test",
    evidence: [
      {
        _id: "rt4gt4t",
        description: "Hello",
        url: "Cool beans",
      },
    ],
    objects_of_culture: {
      object_type: "Landmark",
      object_name: "The end of time",
      landmark: {
        landmark_type: "Archaeological",
        landmark_significance: "The End ",
      },
    },
  });
  const [loading, setLoading] = useState<"loading" | "failed" | "fullfilled">(
    "fullfilled"
  );
  const [err, setErr] = useState({ err: false, message: "" });
  //   useEffect(() => {
  //     fetchPageData(recordId, app)
  //       .then((payload) => {
  //         unstable_batchedUpdates(() => {
  //           setData(payload);
  //           setLoading("fullfilled");
  //         });
  //       })
  //       .catch((e) => {
  //         console.error(e);
  //         unstable_batchedUpdates(() => {
  //           setErr({ err: true, message: e.message });
  //           setLoading("failed");
  //         });
  //       });
  //   }, [app, recordId]);
  return (
    <div id={`${namespace}-container`}>
      {loading === "loading" && (
        <div id={`${namespace}-loading-container`}>
          <LoadingMessage text={"Fetching you record results"} />
        </div>
      )}
      {loading === "failed" && (
        <PageBanner
          bannerMessage={err.message}
          className={`${namespace}-err-banner`}
        />
      )}
      {loading === "fullfilled" && data && <RecordContentPage data={data} />}
    </div>
  );
};
export default RecordPage;
