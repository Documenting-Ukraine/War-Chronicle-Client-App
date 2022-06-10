import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Routes, Route } from "react-router";
import InternationalResponseForm from "./forms/InternationalResponseForm";
import MediaAndDisInformationForm from "./forms/MediaAndDisinformationForm";
import ProtestsAbroad from "./forms/ProtestsAbroadForm";
import RefugeesAndIdpsForm from "./forms/RefugeesAndIdpsForm";
import RussiaForm from "./forms/RussiaForm";
import WarCrimesForm from "./forms/WarCrimesForm";
import RecordFormNav from "./utilities/recordFormNav/RecordFormNav";
import RecordFormWrapper from "./utilities/recordFormWrapper/RecordFormWrapper";
const RecordFormPage = (): JSX.Element => {
  return (
    <>
      <div className="record-form-pg">
        <div className="record-form-pg-container">
          <div className="record-form-pg-header">
            <FontAwesomeIcon icon={faFileLines} />
            <h1>New Record Form</h1>
          </div>
          <RecordFormNav />

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
              path={"create-new-protest-abroad"}
              element={<ProtestsAbroad />}
            />
            <Route
              path={"create-new-international-response"}
              element={<InternationalResponseForm />}
            />
            <Route
              path={"create-new-media-and-disinformation"}
              element={<MediaAndDisInformationForm />}
            />
            <Route path={"create-new-russia"} element={<RussiaForm />} />
          </Routes>
        </div>
      </div>
    </>
  );
};
export default RecordFormPage;
