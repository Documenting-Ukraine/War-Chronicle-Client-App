import { useState } from "react";
import { MultiValue } from "react-select";
import { Disinformation } from "../../../types/dataTypes/DataLists";
import {
  MediaType,
  Languages,
  MediaRegion,
  isMediaType,
} from "../../../types/dataTypes/docTypes/MediaAndDisinformation";
import {
  isOption,
  Option,
  transformSingleList,
} from "../../authPage/data/OccupationList";
import FormDateInputs from "../../utilityComponents/formInputs/FormDateInputs";
import FormInputs, {
  CustomFormInputs,
} from "../../utilityComponents/formInputs/FormInputs";
const newMediaTypes = transformSingleList([...MediaType]);
const newMediaRegion = transformSingleList([...MediaRegion]);
const newDisinformation = transformSingleList([...Disinformation])
const allLanguages = transformSingleList(Languages.map((e) => e.name));
const MediaTypeInput = (): JSX.Element => {
  const [mediaType, setMediaType] = useState<
    typeof MediaType[number] | undefined
  >();
  return (
    <>
      <FormInputs
        title={"Media Type"}
        name={"mediaType"}
        dropDown={newMediaTypes}
        customDropdownFunc={(e: Option | MultiValue<Option> | null) => {
          if (isOption(e) && isMediaType(e.value)) setMediaType(e.value);
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
        />
      )}
    </>
  );
};
const MediaAndDisInformationForm = (): JSX.Element => {
  return (
    <>
      <FormDateInputs
        title="Date of Most Recent Edit"
        name="dateOfRecentEdit"
        onDateChange={(e: Date) => {}}
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
      />
      <MediaTypeInput />
      <FormInputs
        title={"Media Title"}
        name={"mediaTitle"}
        inputType={"text"}
        className="record-form-input"
        required
      />
      <FormInputs
        title="Media Primary Language"
        name="primaryLanguage"
        dropDown={allLanguages}
        className="record-form-input"
        required
      />
      <FormInputs
        title={"Hosting Outlet"}
        name={"hostingOutlet"}
        inputType={"text"}
        className="record-form-input"
        required
      />
      <FormInputs
        title={"Original Outlet"}
        name={"originalOutlet"}
        inputType={"text"}
        className="record-form-input"
        required={false}
      />
      <FormInputs
        title={"Author(s)"}
        name={"author"}
        inputType={"text"}
        className="record-form-input"
        subCaption="Seperate names with a comma"
        required
      />
      <FormInputs
        title={"Disinformation Type"}
        subCaption={"Leave empty if media is truthful"}
        name={"disinformation"}
        className="record-form-input"
        inputType="text"
        required={false}
      />
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
          />
          <FormInputs
            title={"Quote Supporting Stance"}
            name={"editorialQuote"}
            inputType={"text"}
            className="record-form-input"
            required
          />
        </>
      </CustomFormInputs>

      <FormInputs
        title={"Additional Notes"}
        name={"notes"}
        textArea
        className="record-form-input"
        required={false}
      />
    </>
  );
};
export default MediaAndDisInformationForm;
