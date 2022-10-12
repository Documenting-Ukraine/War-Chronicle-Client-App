import { useParams } from "react-router";
import useFetchRecordData from "../../hooks/use-fetch-record-data";
import { useRealmApp } from "../../realm/RealmApp";
import LoadingMessage from "../utilityComponents/loadingMessage/LoadingMessage";
import PageBanner from "../utilityComponents/pageBanner/PageBanner";
import WarCrimesPage from "./recordTypes/WarCrimes/WarCrimes";
import InternationalResponsePage from "./recordTypes/InternationalResponse/InternationalResponse";
import RecordPageWrapper from "./utilities/RecordPageWrapper";
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
  const { data, err, loading } = useFetchRecordData({ app, recordId });
  let formTypeDataInputs = <></>;
  switch (data?.record_type) {
    case "War Crimes":
      formTypeDataInputs = <WarCrimesPage data={data} />;
      break;
    case "Media And Disinformation":
      formTypeDataInputs = <MediaAndDisinformationPage data={data} />;
      break;
    case "International Response":
      formTypeDataInputs = <InternationalResponsePage data={data} />;
      break;
    case "Protests Abroad":
      formTypeDataInputs = <ProtestsAbroadPage data={data} />;
      break;
    case "Refugees And IDPs":
      formTypeDataInputs = <RefugeesAndIdpsPage data={data} />;
      break;
    case "Russia":
      formTypeDataInputs = <RussiaPage data={data} />;
      break;
    default:
      break;
  }
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
      {loading === "fullfilled" && data && (
        <RecordPageWrapper data={data}>
          <>{formTypeDataInputs}</>
        </RecordPageWrapper>
      )}
    </div>
  );
};
export default RecordPage;
