import { lazy, Suspense } from "react";
import { useParams } from "react-router";
import useFetchRecordData from "../../hooks/use-fetch-record-data-redux";
import { useRealmApp } from "../../realm/RealmApp";
import { CategoriesList } from "../../types/dataTypes/CategoryIconMap";
import LoadingIcon from "../utilityComponents/loadingIcon/LoadingIcon";
import PageBanner from "../utilityComponents/pageBanner/PageBanner";
import RecordFormWrapper from "./utilities/recordFormWrapper/RecordFormWrapper";
const InternationalResponseForm = lazy(
  () => import("./forms/InternationalResponseForm/InternationalResponseForm")
);
const MediaAndDisInformationForm = lazy(
  () => import("./forms/MediaAndDisinformationForm/MediaAndDisinformationForm")
);
const ProtestsAbroad = lazy(
  () => import("./forms/ProtestsAbroadForm/ProtestsAbroadForm")
);
const RefugeesAndIdpsForm = lazy(
  () => import("./forms/RefugeesAndIdpsForm/RefugeesAndIdpsForm")
);
const RussiaForm = lazy(() => import("./forms/RussiaForm/RussiaForm"));
const WarCrimesForm = lazy(() => import("./forms/WarCrimesForm/WarCrimesForm"));
const UpdateRecordDataForm = ({
  recordType,
}: {
  recordType: typeof CategoriesList[number];
}) => {
  const app = useRealmApp();
  const params = useParams();
  const recordId = params.recordId ? params.recordId : "";
  const { data, err, loading } = useFetchRecordData({
    app,
    recordId,
  });
  if (loading === "loading") return <LoadingIcon entireViewPort={true} />;
  if (!data)
    return (
      <PageBanner
        bannerMessage={err.message}
        className={`record-pg-err-banner`}
      />
    );
  return (
    <Suspense fallback={<LoadingIcon entireViewPort={true} />}>
      {recordType === "International Response" &&
      data.record_type === "International Response" ? (
        <RecordFormWrapper formAction={"update"} defaultInputs={data}>
          <InternationalResponseForm defaultInputs={data} />
        </RecordFormWrapper>
      ) : recordType === "Media And Disinformation" &&
        data.record_type === recordType ? (
        <RecordFormWrapper
          formAction={"update"}
          dateFirstPublished
          defaultInputs={data}
        >
          <MediaAndDisInformationForm defaultInputs={data} />
        </RecordFormWrapper>
      ) : recordType === "Protests Abroad" &&
        data.record_type === recordType ? (
        <RecordFormWrapper formAction={"update"} defaultInputs={data}>
          <ProtestsAbroad />
        </RecordFormWrapper>
      ) : recordType === "Refugees And IDPs" &&
        data.record_type === recordType ? (
        <RecordFormWrapper
          formAction={"update"}
          dateFirstPublished
          defaultInputs={data}
        >
          <RefugeesAndIdpsForm defaultInputs={data} />
        </RecordFormWrapper>
      ) : recordType === "Russia" && data.record_type === recordType ? (
        <RecordFormWrapper formAction={"update"} defaultInputs={data}>
          <RussiaForm defaultInputs={data} />
        </RecordFormWrapper>
      ) : recordType === "War Crimes" && data.record_type === recordType ? (
        <RecordFormWrapper
          formAction={"update"}
          generalEventType
          defaultInputs={data}
        >
          <WarCrimesForm defaultInputs={data} />
        </RecordFormWrapper>
      ) : null}
    </Suspense>
  );
};
export default UpdateRecordDataForm;
