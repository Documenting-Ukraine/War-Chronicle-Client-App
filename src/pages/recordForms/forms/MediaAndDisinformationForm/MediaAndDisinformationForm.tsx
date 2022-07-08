import { MultiValue } from "react-select";
import useRecordFormPropUpdate from "../../../../hooks/use-record-form-prop-update";
import { isItemInList } from "../../../../types/dataTypes/DataLists";
import {
  MediaType,
  Languages,
  MediaRegion,
  isMediaType,
  MediaAndDisInformation,
} from "../../../../types/dataTypes/docTypes/MediaAndDisinformation";
import {
  isOption,
  Option,
  transformSingleList,
  transformOptions,
} from "../../../authPage/data/OccupationList";
import FormDateInputs from "../../../utilityComponents/formInputs/FormDateInputs";
import FormInputs from "../../../utilityComponents/formInputs/FormInputs";
import MediaAndDisinformationTemplate from "./MediaAndDisinformationTemplate";
import EditiorialStance from "./EditorialStanceInputs";
import { memo, useState } from "react";
const newMediaTypes = transformSingleList([...MediaType]);
const newMediaRegion = transformSingleList([...MediaRegion]);
const allLanguages = transformSingleList(Languages.map((e) => e.name));
const FormBody = memo(
  ({ defaultInputs }: { defaultInputs?: MediaAndDisInformation }) => {
    const updateStoreProps = useRecordFormPropUpdate(
      "Media And Disinformation"
    );
    return (
      <>
        <FormInputs
          title={"Media Region"}
          name={"mediaRegion"}
          dropDown={newMediaRegion}
          className="record-form-input"
          defaultDropDownValue={
            defaultInputs?.media_region
              ? transformOptions(defaultInputs.media_region)
              : undefined
          }
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
        <FormInputs
          title={"Media Title"}
          name={"mediaTitle"}
          inputType={"text"}
          className="record-form-input"
          required
          defaultValue={defaultInputs?.media_title}
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
          defaultDropDownValue={
            defaultInputs?.primary_language
              ? transformOptions(defaultInputs.primary_language)
              : undefined
          }
          customDropdownFunc={(e) => {
            if (isOption(e))
              updateStoreProps({
                primary_language: e.value,
              });
            return { err: false, message: "" };
          }}
        />
        <FormDateInputs
          title="Date of Most Recent Edit"
          name="dateOfRecentEdit"
          onDateChange={(e: Date) => {
            updateStoreProps({
              date_of_most_recent_edit: e,
            });
          }}
          defaultValue={
            defaultInputs?.date_of_most_recent_edit
              ? new Date(defaultInputs?.date_of_most_recent_edit)
              : undefined
          }
          className={"record-form-input"}
          required
          timeInput
        />
        <FormInputs
          title={"Hosting Outlet"}
          name={"hostingOutlet"}
          inputType={"text"}
          className="record-form-input"
          required
          defaultValue={defaultInputs?.hosting_outlet}
          customValidation={(e) => {
            updateStoreProps({
              hosting_outlet: e,
            });
            return { err: false, message: "" };
          }}
        />
        <FormInputs
          defaultValue={defaultInputs?.original_outlet}
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
          defaultValue={defaultInputs?.author}
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
          defaultValue={defaultInputs?.disinformation}
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
          defaultValue={defaultInputs?.notes}
          customValidation={(e) => {
            updateStoreProps({
              notes: e,
            });
            return { err: false, message: "" };
          }}
        />
      </>
    );
  }
);
const MediaAndDisInformationForm = ({
  defaultInputs,
}: {
  defaultInputs?: MediaAndDisInformation;
}): JSX.Element => {
  const updateStoreProps = useRecordFormPropUpdate("Media And Disinformation");
  const [mediaType, setMediaType] = useState<
    typeof MediaType[number] | undefined
  >(defaultInputs?.media_type);
  const mediaTypeOtherEl = (
    <FormInputs
      title={"Custom Media Type"}
      name={"customMediaType"}
      inputType={"text"}
      className="record-form-input"
      defaultValue={defaultInputs?.custom_media_type}
      required
      customValidation={(e) => {
        updateStoreProps({
          custom_media_type: e,
        });
        return { err: false, message: "" };
      }}
    />
  );
  const mediaTypeEl = (
    <>
      <FormInputs
        title={"Media Type"}
        name={"mediaType"}
        dropDown={newMediaTypes}
        defaultValue={defaultInputs?.media_type}
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
    </>
  );
  return (
    <MediaAndDisinformationTemplate
      mediaType={mediaType}
      mediaTypeEl={mediaTypeEl}
      mediaTypeOtherEl={mediaTypeOtherEl}
    >
      <FormBody defaultInputs={defaultInputs} />
    </MediaAndDisinformationTemplate>
  );
};
export default MediaAndDisInformationForm;
