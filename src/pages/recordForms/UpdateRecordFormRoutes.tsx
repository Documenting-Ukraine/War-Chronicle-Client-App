import { Routes, Route } from "react-router";
import UpdateRecordDataForm from "./UpdateRecordDataForm";
const UpdateRecordFormRoutes = () => {
  return (
      <Routes>
        <Route
          path={"update-record-war-crimes/:recordId"}
          element={<UpdateRecordDataForm recordType="War Crimes" />}
        />
        <Route
          path={"update-record-refugees-and-idps/:recordId"}
          element={<UpdateRecordDataForm recordType={"Refugees And IDPs"} />}
        />
        <Route
          path={"update-record-protests-abroad/:recordId"}
          element={<UpdateRecordDataForm recordType="Protests Abroad" />}
        />
        <Route
          path={"update-record-international-response/:recordId"}
          element={<UpdateRecordDataForm recordType="International Response" />}
        />
        <Route
          path={"update-record-media-and-disinformation/:recordId"}
          element={
            <UpdateRecordDataForm recordType="Media And Disinformation" />
          }
        />
        <Route
          path={"update-record-russia/:recordId"}
          element={<UpdateRecordDataForm recordType="Russia" />}
        />
      </Routes>
  );
};
export default UpdateRecordFormRoutes;
