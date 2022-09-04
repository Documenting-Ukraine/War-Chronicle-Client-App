import { useParams } from "react-router";
import useFetchRecordData from "../../hooks/use-fetch-record-data";
import { useRealmApp } from "../../realm/RealmApp";
import LoadingMessage from "../utilityComponents/loadingMessage/LoadingMessage";
import PageBanner from "../utilityComponents/pageBanner/PageBanner";
import RecordPageWrapper from "./RecordPageWrapper";
// import RecordContentPage from "./RecordContentPage";
const RecordPage = () => {
  const namespace = "record-pg";
  const params = useParams();
  const app = useRealmApp();
  const recordId = params.id ? params.id : "";
  const { data, err, loading } = useFetchRecordData({ app, recordId });
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
          <></>
        </RecordPageWrapper>
      )}
    </div>
  );
};
export default RecordPage;
