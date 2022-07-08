import { useEffect, useState } from "react";
import { MultiValue } from "react-select";
import useRecordFormPropUpdate from "../../../../hooks/use-record-form-prop-update";
import { isItemInList } from "../../../../types/dataTypes/DataLists";
import {
  MediaType,
  Languages,
  MediaRegion,
  isMediaType,
} from "../../../../types/dataTypes/docTypes/MediaAndDisinformation";
import {
  isOption,
  Option,
  transformSingleList,
} from "../../../authPage/data/OccupationList";
import FormDateInputs from "../../../utilityComponents/formInputs/FormDateInputs";
import FormInputs, {
  CustomFormInputs,
} from "../../../utilityComponents/formInputs/FormInputs";
const newMediaTypes = transformSingleList([...MediaType]);
const newMediaRegion = transformSingleList([...MediaRegion]);
const allLanguages = transformSingleList(Languages.map((e) => e.name));
const MediaTypeInput = (): JSX.Element => {
  const [mediaType, setMediaType] = useState<
    typeof MediaType[number] | undefined
  >();
  const updateStoreProps = useRecordFormPropUpdate("Media And Disinformation");
  return (
    <>
      <FormInputs
        title={"Media Type"}
        name={"mediaType"}
        dropDown={newMediaTypes}
        customDropdownFunc={(e: Option | MultiValue<Option> | null) => {
          if (isOption(e) && isMediaType(e.value)) {
            setMediaType(e.value);
            updateStoreProps({
              media_type: e.value,
            });
          }
        }}
        className="record-form-input"
        required
      />
      {mediaType === "Other" && (
        <FormInputs
          title={"Custom Media Type"}
          name={"customMediaType"}
          inputType={"text"}
          className="record-form-input"
          required
          customValidation={(e) => {
            updateStoreProps({
              media_type: e,
            });
            return { err: false, message: "" };
          }}
        />
      )}
    </>
  );
};
const EditiorialStance = () => {
  const [stance, setStance] = useState("");
  const [quote, setQuote] = useState("");
  const updateStoreProps = useRecordFormPropUpdate("Media And Disinformation");
  useEffect(() => {
    updateStoreProps({
      editorial_stance: {
        stance: stance,
        quote: quote,
      },
    });
  }, [stance, quote, updateStoreProps]);
  return (
    <CustomFormInputs
      title={"Editorial Stance"}
      name={"editorialStance"}
      className="record-form-input"
      sectionContainer
      required
    >
      <>
        <FormInputs
          title={"Stance (ex. Neutral, Pro-Ukraine, Anti-war, etc)."}
          name={"editorialStance"}
          inputType={"text"}
          className="record-form-input"
          required
          customValidation={(e) => {
            setStance(e);
            return { err: false, message: "" };
          }}
        />
        <FormInputs
          title={"Quote Supporting Stance"}
          name={"editorialQuote"}
          inputType={"text"}
          className="record-form-input"
          required
          customValidation={(e) => {
            setQuote(e);
            return { err: false, message: "" };
          }}
        />
      </>
    </CustomFormInputs>
  );
};
const MediaAndDisInformationForm = (): JSX.Element => {
  const updateStoreProps = useRecordFormPropUpdate("Media And Disinformation");
  return (
    <>
      <FormDateInputs
        title="Date of Most Recent Edit"
        name="dateOfRecentEdit"
        onDateChange={(e: Date) => {
          updateStoreProps({
            date_of_most_recent_edit: e,
          });
        }}
        className={"record-form-input"}
        required
        timeInput
      />
      <FormInputs
        title={"Media Region"}
        name={"mediaRegion"}
        dropDown={newMediaRegion}
        className="record-form-input"
        required
        customDropdownFunc={(e) => {
          if (
            isOption(e) &&
            isItemInList<typeof MediaRegion[number]>(e.value, MediaRegion)
          )
            updateStoreProps({
              media_region: e.value,
            });
        }}
      />
      <MediaTypeInput />
      <FormInputs
        title={"Media Title"}
        name={"mediaTitle"}
        inputType={"text"}
        className="record-form-input"
        required
        customValidation={(e) => {
          updateStoreProps({
            media_title: e,
          });
          return { err: false, message: "" };
        }}
      />
      <FormInputs
        title="Media Primary Language"
        name="primaryLanguage"
        dropDown={allLanguages}
        className="record-form-input"
        required
        customDropdownFunc={(e) => {
          if (isOption(e))
            updateStoreProps({
              primary_language: e.value,
            });
          return { err: false, message: "" };
        }}
      />
      <FormInputs
        title={"Hosting Outlet"}
        name={"hostingOutlet"}
        inputType={"text"}
        className="record-form-input"
        required
        customValidation={(e) => {
          updateStoreProps({
            hosting_outlet: e,
          });
          return { err: false, message: "" };
        }}
      />
      <FormInputs
        title={"Original Outlet"}
        name={"originalOutlet"}
        inputType={"text"}
        className="record-form-input"
        required={false}
        customValidation={(e) => {
          updateStoreProps({
            original_outlet: e,
          });
          return { err: false, message: "" };
        }}
      />
      <FormInputs
        title={"Author(s)"}
        name={"author"}
        inputType={"text"}
        className="record-form-input"
        subCaption="Seperate names with a comma"
        required
        customValidation={(e) => {
          updateStoreProps({
            author: e,
          });
          return { err: false, message: "" };
        }}
      />
      <FormInputs
        title={"Disinformation Type"}
        subCaption={"Leave empty if media is truthful"}
        name={"disinformation"}
        className="record-form-input"
        inputType="text"
        required={false}
        customValidation={(e) => {
          updateStoreProps({
            disinformation: e,
          });
          return { err: false, message: "" };
        }}
      />
      <EditiorialStance />
      <FormInputs
        title={"Additional Notes"}
        name={"notes"}
        textArea
        className="record-form-input"
        required={false}
        customValidation={(e) => {
          updateStoreProps({
            notes: e,
          });
          return { err: false, message: "" };
        }}
      />
    </>
  );
};
export default MediaAndDisInformationForm;
