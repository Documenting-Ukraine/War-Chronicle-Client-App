import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router";
import { useLocation } from "react-router";
import RecordFormNav from "./utilities/recordFormNav/RecordFormNav";
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
        <div className="record-form-pg-container">
          <RecordFormNav />
          <div>Hello</div>
        </div>
      </>
    );
};
export default RecordFormPage;
