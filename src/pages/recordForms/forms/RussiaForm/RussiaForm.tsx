import { useState } from "react";
import { MultiValue } from "react-select";
import { RussianRecordTypes } from "../../../../types/dataTypes/DataLists";
import { isRussianRecordType } from "../../../../types/dataTypes/docTypes/Russia";
import {
  isOption,
  Option,
  transformSingleList,
  transformOptions,
} from "../../../authPage/data/OccupationList";
import FormInputs from "../../../utilityComponents/formInputs/FormInputs";
import SportsAndCulture from "./SportsAndCulture";
import Sanctions from "./Sanctions";
import Protests from "./Protests";
import Corporations from "./Corporations";
import useRecordFormPropUpdate from "../../../../hooks/use-record-form-prop-update";
import RussiaTemplate from "./RussiaTemplate";
import { Russia } from "../../../../types";
const newRussianRecordTypes = transformSingleList([...RussianRecordTypes]);
const RussiaForm = ({
  defaultInputs,
}: {
  defaultInputs?: Russia;
}): JSX.Element => {
  const updateStoreProps = useRecordFormPropUpdate("Russia");
  const [russianRecordType, setRussianRecordType] = useState<
    typeof RussianRecordTypes[number] | undefined
  >(defaultInputs?.russian_record_type);
  return (
    <RussiaTemplate
      russianRecordType={russianRecordType}
      corporationsEl={<Corporations defaultInputs={defaultInputs} />}
      protestsEl={<Protests defaultInputs={defaultInputs} />}
      sanctionsEl={<Sanctions defaultInputs={defaultInputs} />}
      sportsEl={<SportsAndCulture defaultInputs={defaultInputs} />}
    >
      <>
        <FormInputs
          title="Russian Record Type"
          name="russianRecordType"
          dropDown={newRussianRecordTypes}
          defaultDropDownValue={
            russianRecordType ? transformOptions(russianRecordType) : undefined
          }
          customDropdownFunc={(e: Option | MultiValue<Option> | null) => {
            if (isOption(e) && isRussianRecordType(e.value)) {
              setRussianRecordType(e.value);
              updateStoreProps({ russian_record_type: e.value });
            }
          }}
          required
        />
        <FormInputs title={"Notes"} name={"notes"} textArea required={false} />
      </>
    </RussiaTemplate>
  );
};
export default RussiaForm;
