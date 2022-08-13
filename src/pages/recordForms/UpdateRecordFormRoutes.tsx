import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import LoadingIcon from "../utilityComponents/loadingIcon/LoadingIcon";
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
const UpdateRecordFormRoutes = () => {
  return (
    <Suspense fallback={<LoadingIcon entireViewPort={true} />}>
      <Routes>
        <Route
          path={"update-record-war-crimes"}
          element={
            <RecordFormWrapper generalEventType>
              <WarCrimesForm />
            </RecordFormWrapper>
          }
        />
        <Route
          path={"update-record-refugees-and-idps"}
          element={
            <RecordFormWrapper dateFirstPublished>
              <RefugeesAndIdpsForm />
            </RecordFormWrapper>
          }
        />
        <Route
          path={"update-record-protests-abroad"}
          element={
            <RecordFormWrapper>
              <ProtestsAbroad />
            </RecordFormWrapper>
          }
        />
        <Route
          path={"update-record-international-response"}
          element={
            <RecordFormWrapper>
              <InternationalResponseForm />
            </RecordFormWrapper>
          }
        />
        <Route
          path={"update-record-media-and-disinformation"}
          element={
            <RecordFormWrapper dateFirstPublished>
              <MediaAndDisInformationForm />
            </RecordFormWrapper>
          }
        />
        <Route
          path={"update-record-russia"}
          element={
            <RecordFormWrapper>
              <RussiaForm />
            </RecordFormWrapper>
          }
        />
      </Routes>
    </Suspense>
  );
};
export default UpdateRecordFormRoutes;