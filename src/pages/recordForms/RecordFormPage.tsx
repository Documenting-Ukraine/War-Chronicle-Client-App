import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import LoadingIcon from "../utilityComponents/loadingIcon/LoadingIcon";
import PageWrapper from "../utilityComponents/pageWrapper/PageWrapper";
import RecordFormNav from "./utilities/recordFormNav/RecordFormNav";
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

const RecordFormPage = (): JSX.Element => {
  return (
    <PageWrapper
      heading="New Record Form"
      icon={<FontAwesomeIcon icon={faFileLines} />}
    >
      <>
        <RecordFormNav />
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
      </>
    </PageWrapper>
  );
};
export default RecordFormPage;
