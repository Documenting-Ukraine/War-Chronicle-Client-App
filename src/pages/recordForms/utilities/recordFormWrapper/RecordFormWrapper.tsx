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
import FormListInputs from "../../../utilityComponents/formInputs/FormListInputs";
interface RecordFormWrapperProps {
  children: JSX.Element;
  callback?: (e: React.FormEvent<HTMLFormElement>) => void;
  generalEventType?: boolean;
}
const RecordFormWrapper = ({
  generalEventType = false,
  children,
  callback,
}: RecordFormWrapperProps): JSX.Element => {
  const params = useParams();
  const route = params["formid"];
  const formType = route ? grabRecordFormType(route) : "Form";
  const [similarRecords, setSimilarRecords] = useState<RecordSubmissionType[]>(
    []
  );
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
          <FormInputs
            name="Title"
            className="record-form-input"
            required
            inputType="text"
          />
          <FormInputs
            textArea
            name={"General Description"}
            className="record-form-input"
            required
          />
          <CustomFormInputs name="Media" className="record-form-input">
            <>
              <FormDropZone
                name={"Images"}
                mediaType={"images"}
                description={"Upload Images"}
                maxFiles={10}
                className={"media-form-input"}
                maxSize={Math.pow(10, 6) * 5}
              />
              <FormDropZone
                name={"Videos"}
                mediaType={"videos"}
                description={"Upload Videos"}
                maxFiles={10}
                maxSize={Math.pow(10, 8) * 5}
              />
            </>
          </CustomFormInputs>
          <CustomFormInputs
            name="Main Evidence"
            className="record-form-input"
            required
          >
            <FormListInputs />
          </CustomFormInputs>
          <CustomFormInputs
            name="Additional Evidence"
            className="record-form-input"
            required={false}
          >
            <FormListInputs required={false} />
          </CustomFormInputs>
          {generalEventType && <>
            
          </>}
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
