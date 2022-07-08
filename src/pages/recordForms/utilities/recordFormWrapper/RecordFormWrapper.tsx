import { useParams } from "react-router";
import { grabRecordFormType } from "../../data/recordFormRoutes";
import RecordFormBox from "./RecordFormBox";
import { RecordProperties } from "./RecordItem";
import RecordFormBoxes from "./RecordFormBoxes";
import React, { useState } from "react";
import FormInputs, {
  CustomFormInputs,
} from "../../../utilityComponents/formInputs/FormInputs";
import FormDropZone from "../../../utilityComponents/formInputs/FormDropZone/FormDropZone";
import FormListInputs from "../../../utilityComponents/formInputs/FormListInputs";
import FormDateInputs from "../../../utilityComponents/formInputs/FormDateInputs";
import FormAddressInputs from "../../../utilityComponents/formInputs/FormAddressInputs";
import useWindowWidth from "../../../../hooks/use-window-width";
import {
  GeneralEventType,
  GeneralRecordType,
} from "../../../../types/dataTypes/GeneralRecordType";
import RecordFormSubmitWrapper from "./RecordFormSubmitWrapper";
import { DropZoneProvider } from "../../../utilityComponents/formInputs/FormDropZone/FormDropZoneContext";

export type SubmitCallbackProps = {
  recordType: string;
  generalProps: GeneralRecordType | GeneralEventType;
  additionalProps: {
    [key: string]: any;
  };
  event: React.FormEvent<HTMLFormElement>;
};
interface RecordFormWrapperProps {
  children: JSX.Element;
  dateFirstPublished?: boolean;
  generalEventType?: boolean;
}

const RecordFormWrapper = ({
  generalEventType = false,
  dateFirstPublished = false,
  children,
}: RecordFormWrapperProps): JSX.Element => {
  const params = useParams();
  const route = params["*"];
  const formType = route ? grabRecordFormType(route) : "Form";
  const mediumWindowWidth = useWindowWidth(992);
  const [similarRecords, setSimilarRecords] = useState<RecordProperties[]>([]);

  return (
    <div className="record-form-pg-wrapper">
      {!mediumWindowWidth && (
        <RecordFormBoxes similarRecords={similarRecords} />
      )}
      <RecordFormBox
        title={`New ${formType} Record`}
        className="record-form-pg-form"
      >
        <DropZoneProvider>
          <RecordFormSubmitWrapper recordType={formType}>
            <>
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
              {dateFirstPublished && !generalEventType && (
                <FormDateInputs
                  className="record-form-input"
                  title="Date First Published"
                  name="dateFirstPublished"
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
                    title="Date First Published"
                    name="dateFirstPublished"
                    onDateChange={(e: Date) => {}}
                    timeInput
                    required
                  />
                  <FormDateInputs
                    className="record-form-input"
                    title="Date Event Occurred"
                    name="dateEventOccurred"
                    onDateChange={(e: Date) => {}}
                    timeInput
                    required
                  />
                </>
              )}
                            <CustomFormInputs
                name="Evidence"
                className="record-form-input"
                required
              >
                <FormListInputs />
              </CustomFormInputs>
              <CustomFormInputs
                title="Media Files"
                name={"mediaFiles"}
                className="record-form-input"
                required={false}
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
              {children}
            </>
          </RecordFormSubmitWrapper>
        </DropZoneProvider>
      </RecordFormBox>
      {mediumWindowWidth && <RecordFormBoxes similarRecords={similarRecords} />}
    </div>
  );
};
export default RecordFormWrapper;
