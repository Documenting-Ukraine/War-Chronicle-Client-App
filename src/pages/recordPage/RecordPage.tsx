import { useParams } from "react-router";
import useFetchRecordData from "../../hooks/use-fetch-record-data-redux";
import { useRealmApp } from "../../realm/RealmApp";
import LoadingMessage from "../utilityComponents/loadingMessage/LoadingMessage";
import PageBanner from "../utilityComponents/pageBanner/PageBanner";
import RecordPageWrapper from "./utilities/RecordPageWrapper";
import { RecordSubmissionType } from "../../types";
import { GeneralRecordType } from "../../types/dataTypes/GeneralRecordType";
import InternationalResponsePage from "./recordTypes/InternationalResponse/InternationalResponse";
import WarCrimesPage from "./recordTypes/WarCrimes/WarCrimes";
import MediaAndDisinformationPage from "./recordTypes/MediaAndDisinformation/MediaAndDisinformation";
import ProtestsAbroadPage from "./recordTypes/ProtestsAbroad/ProtestsAbroad";
import RefugeesAndIdpsPage from "./recordTypes/RefugeesAndIDPs/RefugeesAndIDPs";
import RussiaPage from "./recordTypes/Russia/Russia";

// import RecordContentPage from "./RecordContentPage";
const RecordPage = () => {
  const namespace = "record-pg";
  const params = useParams();
  const app = useRealmApp();
  const recordId = params.id ? params.id : "";
  //const { data, err, loading } = useFetchRecordData({ app, recordId });
  const { err } = useFetchRecordData({ app, recordId });
  const loading: "fullfilled" | "loading" | "failed" = "fullfilled";
  const data: RecordSubmissionType = {
    _id: "38294793",
    record_title: "Hello",
    record_creation_date: new Date(),
    media: { images: [], videos: [] },
    description: "Hello",
    evidence: [{ _id: "4234f2r3", url: "Hello", description: "derfwewf" }],
    contributors: [
      {
        _id: "32434234",
        first_name: "Arky",
        last_name: "Asmal",
        date_first_edited: new Date(),
      },
    ],
    //event type
    // address: {
    //   oblast: "Kyiv",
    //   city: "Kyiv",
    //   latitude: "14412",
    //   longitude: "124124",
    // },
    // date_first_published: new Date(),
    // date_event_occurred: new Date(),
    //end of event type
    record_type: "Refugees And IDPs",
    date_first_published: new Date(),
    refugees_and_idps_type: "Refugees",
    total_num_of_refugees: 100000,
    host_country: {
      country_name: "US",
      refugees_in_host_country: 10000,
    }
  };
  let formTypeDataInputs = <></>;
  switch (data?.record_type) {
    // case "International Response":
    //   formTypeDataInputs = <InternationalResponsePage data={data} />;
    //   break;
    // case "War Crimes":
    //   formTypeDataInputs = <WarCrimesPage data={data} />;
    //   break;
    // case "Media And Disinformation":
    //   formTypeDataInputs = <MediaAndDisinformationPage data={data} />;
    //   break;
    // case "Protests Abroad":
    //   formTypeDataInputs = <ProtestsAbroadPage data={data} />;
    //   break;
    case "Refugees And IDPs":
      formTypeDataInputs = <RefugeesAndIdpsPage data={data} />;
      break;
    // case "Russia":
    //   formTypeDataInputs = <RussiaPage data={data} />;
    //   break;
    // default:
    //   break;
  }
  console.log(data);
  return (
    <div id={`${namespace}-container`}>
      {/* {loading === "loading" && (
        <div id={`${namespace}-loading-container`}>
          <LoadingMessage text={"Fetching you record results"} />
        </div>
      )}
      {loading === "failed" && (
        <PageBanner
          bannerMessage={err.message}
          className={`${namespace}-err-banner`}
        />
      )} */}
      {loading === "fullfilled" && data && (
        <RecordPageWrapper data={data}>
          <>{formTypeDataInputs}</>
        </RecordPageWrapper>
      )}
    </div>
  );
};
export default RecordPage;
