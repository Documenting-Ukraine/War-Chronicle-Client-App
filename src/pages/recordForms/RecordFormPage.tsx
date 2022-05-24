import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router";
import { useLocation } from "react-router";
import RecordFormNav from "./utilities/recordFormNav/RecordFormNav";
import RecordFormWrapper from "./utilities/recordFormWrapper/RecordFormWrapper";
const RecordFormPage = ({ overview }: { overview?: boolean }): JSX.Element => {
  const [invalidPage, setInvalidPage] = useState(false);
  const location = useLocation();
  const params = useParams();
  const formType = !params["formid"];

  useLayoutEffect(() => {
    if (formType) setInvalidPage(true);
  }, [params]);
    return (
      <>
        <div className="record-form-pg">
          <div className="record-form-pg-container">
            <div className="record-form-pg-header">
              <FontAwesomeIcon icon={faFileLines} />
              <h1>New Record Form</h1>
            </div>
            <RecordFormNav />
            <RecordFormWrapper>
              <div>Hello</div>
            </RecordFormWrapper>
          </div>
        </div>
      </>
    );
};
export default RecordFormPage;
