import { useState } from "react";
import { MultiValue } from "react-select";
import { RussianRecordTypes } from "../../../../types/dataTypes/DataLists";
import { isRussianRecordType } from "../../../../types/dataTypes/docTypes/Russia";
import {
  isOption,
  Option,
  transformSingleList,
} from "../../../authPage/data/OccupationList";
import FormInputs from "../../../utilityComponents/formInputs/FormInputs";
import SportsAndCulture from "./SportsAndCulture";
import Sanctions from "./Sanctions";
import Protests from "./Protests";
import Corporations from "./Corporations";
import useRecordFormPropUpdate from "../../../../hooks/use-record-form-prop-update";
const newRussianRecordTypes = transformSingleList([...RussianRecordTypes]);
const RussiaForm = (): JSX.Element => {
  const updateStoreProps = useRecordFormPropUpdate("Russia");
  const [russianRecordType, setRussianRecordType] = useState<
    typeof RussianRecordTypes[number] | undefined
  >();
  return (
    <>
      <FormInputs
        title="Russian Record Type"
        name="russianRecordType"
        dropDown={newRussianRecordTypes}
        customDropdownFunc={(e: Option | MultiValue<Option> | null) => {
          if (isOption(e) && isRussianRecordType(e.value)) {
            setRussianRecordType(e.value);
            updateStoreProps({ russian_record_type: e.value });
          }
        }}
        required
      />
      {russianRecordType === "Corporation Responses" && <Corporations />}
      {russianRecordType === "Protests in Russia" && <Protests />}
      {russianRecordType === "Sanctions vs. Russia" && <Sanctions />}
      {russianRecordType === "Sports and Culture Responses" && (
        <SportsAndCulture />
      )}
      <FormInputs title={"Notes"} name={"notes"} textArea required={false} />
    </>
  );
};
export default RussiaForm;
