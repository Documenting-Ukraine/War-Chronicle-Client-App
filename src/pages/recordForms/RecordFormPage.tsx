import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageWrapper from "../utilityComponents/pageWrapper/PageWrapper";
import CreateRecordFormRoutes from "./CreateRecordFormRoutes";
import RecordFormNav from "./utilities/recordFormNav/RecordFormNav";
import UpdateRecordFormRoutes from "./UpdateRecordFormRoutes";
import { useParams } from "react-router";
import { isolateUpdateRecordRoute } from "./data/recordFormRoutes";
const RecordFormPage = (): JSX.Element => {
  const params = useParams();
  const location = params["*"];
  const isUpdateRecordRoute = location && isolateUpdateRecordRoute(location);
  return (
    <PageWrapper
      heading={isUpdateRecordRoute ? "Update Record" : "New Record Form"}
      icon={<FontAwesomeIcon icon={faFileLines} />}
    >
      <>
        {!isUpdateRecordRoute && <RecordFormNav />}
        <CreateRecordFormRoutes />
        <UpdateRecordFormRoutes />
      </>
    </PageWrapper>
  );
};
export default RecordFormPage;
