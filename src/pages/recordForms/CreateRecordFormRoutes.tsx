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
const CreateRecordFormRoutes = () => {
  return (
    <Suspense fallback={<LoadingIcon entireViewPort={true} />}>
      <Routes>
        <Route
          path={"create-new-war-crimes"}
          element={
            <RecordFormWrapper generalEventType>
              <WarCrimesForm />
            </RecordFormWrapper>
          }
        />
        <Route
          path={"create-new-refugees-and-idps"}
          element={
            <RecordFormWrapper dateFirstPublished>
              <RefugeesAndIdpsForm />
            </RecordFormWrapper>
          }
        />
        <Route
          path={"create-new-protests-abroad"}
          element={
            <RecordFormWrapper>
              <ProtestsAbroad />
            </RecordFormWrapper>
          }
        />
        <Route
          path={"create-new-international-response"}
          element={
            <RecordFormWrapper>
              <InternationalResponseForm />
            </RecordFormWrapper>
          }
        />
        <Route
          path={"create-new-media-and-disinformation"}
          element={
            <RecordFormWrapper dateFirstPublished>
              <MediaAndDisInformationForm />
            </RecordFormWrapper>
          }
        />
        <Route
          path={"create-new-russia"}
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
export default CreateRecordFormRoutes;
