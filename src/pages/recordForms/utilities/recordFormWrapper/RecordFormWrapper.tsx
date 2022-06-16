import { useParams } from "react-router";
import { grabRecordFormType } from "../../data/recordFormRoutes";
import RecordFormBox from "./RecordFormBox";
import RecordItem, { RecordProperties } from "./RecordItem";
import React, { useState } from "react";
import FormInputs, {
  CustomFormInputs,
} from "../../../utilityComponents/formInputs/FormInputs";
import FormDropZone from "../../../utilityComponents/formInputs/FormDropZone";
import FormListInputs from "../../../utilityComponents/formInputs/FormListInputs";
import FormDateInputs from "../../../utilityComponents/formInputs/FormDateInputs";
import FormAddressInputs from "../../../utilityComponents/formInputs/FormAddressInputs";
import useWindowWidth from "../../../../hooks/use-window-width";
import { v4 as uuid } from "uuid";
const guidelines = [
  "Be concise and specific. Avoid non-objective language",
  "No duplicate records. Reference our similar records to prevent duplicate creation",
  "Submit one entry at a time. Entries with multiple data sets will be removed",
];
interface RecordFormWrapperProps {
  children: JSX.Element;
  callback?: (e: React.FormEvent<HTMLFormElement>) => void;
  dateFirstPublished?: boolean;
  generalEventType?: boolean;
}
const RecordFormBoxes = ({
  similarRecords,
}: {
  similarRecords: RecordProperties[];
}): JSX.Element => {
  return (
    <div className="record-form-pg-boxes">
      <RecordFormBox title={"Guidelines"} className="record-form-guidelines">
        <ol>
          {guidelines.map((str) => {
            const [bolded, nonBolded] = str.split(".");
            return (
              <li key={bolded}>
                <b>{bolded}.</b>
                {nonBolded}
              </li>
            );
          })}
        </ol>
      </RecordFormBox>
      <RecordFormBox
        title={"Similar Records"}
        className="record-form-similar-records"
      >
        <>
          {similarRecords.map((record) =>(
            <RecordItem
              key={record._id}
              id={record._id}
              title={record.record_title}
              recordType={record.record_type}
              description={record.description}
              creationDate={record.record_creation_date}
            />
          ))}
        </>
      </RecordFormBox>
    </div>
  );
};
const RecordFormWrapper = ({
  generalEventType = false,
  dateFirstPublished = false,
  children,
  callback,
}: RecordFormWrapperProps): JSX.Element => {
  const params = useParams();
  const route = params["*"];
  const formType = route ? grabRecordFormType(route) : "Form";
  const mediumWindowWidth = useWindowWidth(992);
  const [similarRecords, setSimilarRecords] = useState<RecordProperties[]>(
    [{
      _id: uuid(),
      record_title: "Hello",
      record_type: "International Response",
      description: "Hello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the worldHello the world",
      record_creation_date: new Date()
    }, {
      _id: uuid(),
      record_title: "Hello",
      record_type: "International Response",
      description: "Hello the world",
      record_creation_date: new Date()
    }, {
      _id: uuid(),
      record_title: "Hello",
      record_type: "International Response",
      description: "Hello the world",
      record_creation_date: new Date()
    }, {
      _id: uuid(),
      record_title: "Hello",
      record_type: "International Response",
      description: "Hello the world",
      record_creation_date: new Date()
    }, {
      _id: uuid(),
      record_title: "Hello",
      record_type: "International Response",
      description: "Hello the world",
      record_creation_date: new Date()
    }]
  );
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const generalProps = {};
    if (callback) callback(e);
  };
  return (
    <div className="record-form-pg-wrapper">
      {!mediumWindowWidth && (
        <RecordFormBoxes similarRecords={similarRecords} />
      )}

      <RecordFormBox
        title={`New ${formType} Record`}
        className="record-form-pg-form"
      >
        <form onSubmit={onSubmit}>
          <FormInputs
            title="Record Title"
            name="title"
            className="record-form-input"
            required
            inputType="text"
          />
          <FormInputs
            textArea
            title={"General Description"}
            name={"description"}
            className="record-form-input"
            required
          />
          <CustomFormInputs
            title="Media Files"
            name={"mediaFiles"}
            className="record-form-input"
          >
            <>
              <FormDropZone
                name={"images"}
                mediaType={"images"}
                description={"Upload Images"}
                maxFiles={10}
                className={"media-form-input"}
                maxSize={Math.pow(10, 6) * 5}
              />
              <FormDropZone
                name={"videos"}
                mediaType={"videos"}
                description={"Upload Videos"}
                maxFiles={10}
                maxSize={Math.pow(10, 8) * 5}
              />
            </>
          </CustomFormInputs>
          <CustomFormInputs
            name="Evidence"
            className="record-form-input"
            required
          >
            <FormListInputs />
          </CustomFormInputs>

          {dateFirstPublished && !generalEventType && (
            <FormDateInputs
              className="record-form-input"
              name="Date First Published"
              onDateChange={(e: Date) => {}}
              timeInput
              required
            />
          )}
          {generalEventType && (
            <>
              <FormAddressInputs />
              <FormDateInputs
                className="record-form-input"
                name="Date First Published"
                onDateChange={(e: Date) => {}}
                timeInput
                required
              />
              <FormDateInputs
                className="record-form-input"
                name="Date Event Occurred"
                onDateChange={(e: Date) => {}}
                timeInput
                required
              />
            </>
          )}
          {children}
          <button
            className={"record-form-submit-btn"}
            type="submit"
            aria-label={"submit-new-record"}
          >
            <span>Submit</span>
          </button>
        </form>
      </RecordFormBox>
      {mediumWindowWidth && <RecordFormBoxes similarRecords={similarRecords} />}
    </div>
  );
};
export default RecordFormWrapper;
