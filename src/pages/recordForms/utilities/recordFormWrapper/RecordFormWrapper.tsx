import { useParams } from "react-router";
import { RecordSubmissionType } from "../../../../types";
import { grabRecordFormType } from "../../data/recordFormRoutes";
import RecordFormBox from "./RecordFormBox";
import RecordItem from "./RecordItem";
import React, { useState } from "react";
import FormInputs, {
  CustomFormInputs,
} from "../../../utilityComponents/formInputs/FormInputs";
import FormDropZone from "../../../utilityComponents/formInputs/FormDropZone";
interface RecordFormWrapperProps {
  children: JSX.Element;
  callback?: (e: React.FormEvent<HTMLFormElement>) => void;
}
const RecordFormWrapper = ({
  children,
  callback,
}: RecordFormWrapperProps): JSX.Element => {
  const params = useParams();
  const route = params["formid"];
  const formType = route ? grabRecordFormType(route) : "Form";
  const [similarRecords, setSimilarRecords] = useState<RecordSubmissionType[]>(
    []
  );
  const [title, setTitle] = useState("");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const generalProps = {};
    if (callback) callback(e);
  };
  return (
    <div className="record-form-pg-wrapper">
      <RecordFormBox
        title={`New ${formType} Record`}
        className="record-form-pg-form"
      >
        <form onSubmit={onSubmit}>
          <CustomFormInputs name="Title" className="record-form-input">
            <input
              id={"record-title"}
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
            />
          </CustomFormInputs>
          <FormInputs
            textArea
            name={"Description"}
            className="record-form-input"
          />
          <FormDropZone
            name={"Images"}
            mediaType={"images"}
            description={"Insert Images Here"}
            maxFiles={10}
            maxSize={Math.pow(10, 6)*5}
          />
          <FormDropZone
            name={"Videos"}
            mediaType={"videos"}
            description={"Insert Videos Here"}
            maxFiles={10}
            maxSize={Math.pow(10, 8)*5}
          />
          {children}
        </form>
      </RecordFormBox>
      <div className="record-form-pg-boxes">
        <RecordFormBox
          title={"Similar Records"}
          className="record-form-similar-records"
        >
          <>
            {similarRecords?.map((record) => {
              <RecordItem
                key={record._id}
                id={record._id}
                title={record.record_title}
                recordType={record.record_type}
                description={record.description}
                creationDate={record.record_creation_date}
              />;
            })}
          </>
        </RecordFormBox>
        <RecordFormBox title={"Guidelines"} className="record-form-guidelines">
          <div></div>
        </RecordFormBox>
      </div>
    </div>
  );
};
export default RecordFormWrapper;
