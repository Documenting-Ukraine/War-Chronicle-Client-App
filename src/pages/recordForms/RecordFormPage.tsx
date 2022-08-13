import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageWrapper from "../utilityComponents/pageWrapper/PageWrapper";
import CreateRecordFormRoutes from "./CreateRecordFormRoutes";
import RecordFormNav from "./utilities/recordFormNav/RecordFormNav";
import UpdateRecordFormRoutes from "./UpdateRecordFormRoutes";
const RecordFormPage = (): JSX.Element => {
  return (
    <PageWrapper
      heading="New Record Form"
      icon={<FontAwesomeIcon icon={faFileLines} />}
    >
      <>
        <RecordFormNav />
        <CreateRecordFormRoutes />
        <UpdateRecordFormRoutes />
      </>
    </PageWrapper>
  );
};
export default RecordFormPage;
