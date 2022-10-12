import { useParams } from "react-router";
import {
  grabCreateRecordFormType,
  grabUpdateRecordFormType,
} from "../../data/recordFormRoutes";
import RecordFormBox from "./RecordFormBox";
import RecordFormSearch from "./RecordFormSearch";
import React, { useEffect, useLayoutEffect, useState, useMemo } from "react";
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
import { RecordSubmissionType } from "../../../../types";
import { useRealmApp } from "../../../../realm/RealmApp";
import { useDispatch } from "react-redux";
import { clearSearchData } from "../../../../store/reducers/recordForms/recordFormSearch/recordFormsSearchReducer";
import { fetchRecordForms } from "../../../../store/reducers/asyncActions/recordFormActions/fetchRecordForms";
import { isItemInList } from "../../../../types/dataTypes/DataLists";
import { CategoriesList } from "../../../../types/dataTypes/CategoryIconMap";
import { debounce } from "lodash";
import removeAddedWhiteSpace from "../../../../helperFunctions/removeWhiteSpace";

export type SubmitCallbackProps = {
  recordType: string;
  generalProps: GeneralRecordType | GeneralEventType;
  additionalProps: {
    [key: string]: any;
  };
  event: React.FormEvent<HTMLFormElement>;
};
interface RecordFormWrapperProps {
  formAction?: "create-new" | "update";
  children: JSX.Element;
  dateFirstPublished?: boolean;
  generalEventType?: boolean;
  defaultInputs?: RecordSubmissionType;
}
const RecordFormWrapper = ({
  formAction = "create-new",
  generalEventType = false,
  dateFirstPublished = false,
  defaultInputs,
  children,
}: RecordFormWrapperProps): JSX.Element => {
  const app = useRealmApp();
  const dispatch = useDispatch();
  const params = useParams();
  const route = params["*"];
  const createRouteFormType = route ? grabCreateRecordFormType(route) : "Form";
  const updateRouteFormType = route ? grabUpdateRecordFormType(route) : "Form";
  const formType =
    formAction === "create-new" ? createRouteFormType : updateRouteFormType;
  const mediumWindowWidth = useWindowWidth(992);
  const [title, setTitle] = useState(
    defaultInputs?.record_title ? defaultInputs.record_title : ""
  );
  const updateRecordTitle = (e: string) => setTitle(e);
  const debouncedTitle = useMemo(() => debounce(updateRecordTitle, 4000), []);
  //clear search history
  useLayoutEffect(() => {
    dispatch(clearSearchData({}));
  }, [dispatch]);
  useEffect(() => {
    return () => {
      dispatch(clearSearchData({}));
    };
  }, [dispatch]);
  const eventRecordType =
    defaultInputs?.record_type !== "War Crimes" &&
    defaultInputs?.record_type !== "Protests Abroad" &&
    defaultInputs?.record_type !== "Russia";
  const russianEventRecordType =
    defaultInputs?.record_type === "Russia" &&
    defaultInputs.russian_record_type === "Protests in Russia";
  const eventType = !eventRecordType && russianEventRecordType;
  useEffect(() => {
    const charLenBeforeSearch = 4;
    if (removeAddedWhiteSpace(title).length >= charLenBeforeSearch) {
      if (
        isItemInList<typeof CategoriesList[number]>(formType, CategoriesList)
      ) {
        dispatch(
          fetchRecordForms({
            app: app,
            input: {
              searchQuery: {
                value: title,
                categories: [formType],
              },
            },
          })
        );
      }
    }
  }, [app, title, formType, dispatch]);
  return (
    <div className="record-form-pg-wrapper">
      {!mediumWindowWidth && <RecordFormSearch />}
      <RecordFormBox
        title={`${
          formAction === "create-new" ? "New" : "Update"
        } ${formType} Record`}
        className="record-form-pg-form"
      >
        <DropZoneProvider>
          <RecordFormSubmitWrapper recordType={formType}>
            <>
              <FormInputs
                title="Record Title"
                name="recordTitle"
                className="record-form-input"
                required
                inputType="text"
                defaultValue={title}
                customValidation={(e) => {
                  debouncedTitle(e);
                  return { err: false, message: "" };
                }}
              />
              <FormInputs
                textArea
                title={"General Description"}
                name={"description"}
                className="record-form-input"
                defaultValue={defaultInputs?.description}
                required
              />
              {dateFirstPublished && !generalEventType && (
                <FormDateInputs
                  className="record-form-input"
                  title="Date First Published"
                  name="dateFirstPublished"
                  defaultValue={
                    defaultInputs
                      ? new Date(
                          eventType
                            ? defaultInputs.date_first_published
                            : new Date()
                        )
                      : undefined
                  }
                  onDateChange={(e: Date) => {}}
                  timeInput
                  required
                />
              )}
              {generalEventType && (
                <>
                  <FormAddressInputs
                    defaultAddress={
                      eventType ? defaultInputs.address : undefined
                    }
                  />
                  <FormDateInputs
                    className="record-form-input"
                    title="Date First Published"
                    name="dateFirstPublished"
                    defaultValue={
                      defaultInputs
                        ? new Date(
                            eventType
                              ? defaultInputs.date_first_published
                              : new Date()
                          )
                        : undefined
                    }
                    onDateChange={(e: Date) => {}}
                    timeInput
                    required
                  />
                  <FormDateInputs
                    defaultValue={
                      defaultInputs
                        ? new Date(
                            eventType
                              ? defaultInputs.date_event_occurred
                              : new Date()
                          )
                        : undefined
                    }
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
                <FormListInputs defaultValues={defaultInputs?.evidence} />
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
                    defaultFiles={defaultInputs?.media?.images}
                  />
                  <FormDropZone
                    name={"videos"}
                    defaultFiles={defaultInputs?.media?.videos}
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
      {mediumWindowWidth && <RecordFormSearch />}
    </div>
  );
};
export default RecordFormWrapper;
