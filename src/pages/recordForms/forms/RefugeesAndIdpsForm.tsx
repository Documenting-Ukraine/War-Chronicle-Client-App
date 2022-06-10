import FormInputs, {CustomFormInputs} from "../../utilityComponents/formInputs/FormInputs";
import {
  isOption,
  Option,
  transformSingleList,
} from "../../authPage/data/OccupationList";
import { MultiValue } from "react-select";
import {
  isRefugeesAndIdpsType,
  RefugeesAndIdpsTypes,
} from "../../../types/dataTypes/docTypes/RefugeesAndIdps";
import { useState } from "react";
const refugeesAndIdpsOptions = transformSingleList([...RefugeesAndIdpsTypes]);
const Refugees = (): JSX.Element => {
  return (
    <>
      <FormInputs
        title={"Total Number of UKR Refugees Worldwide as of published date"}
        name={"totalNumOfRefugees"}
        inputType="number"
        className="record-form-input"
        required
      />
      <CustomFormInputs
        title={"Host Country"}
        name={"hostCountry"}
        className="record-form-input"
        required
        sectionContainer
      >
        <>
          <FormInputs
            title={"Country Name"}
            name={"hostCountryName"}
            inputType="string"
            className="record-form-input"
            required
          />
          <FormInputs
            title={"UKR Refugees in Country as of published date"}
            name={"refugeesInHostCountry"}
            inputType="number"
            className="record-form-input"
            required
          />
        </>
      </CustomFormInputs>
    </>
  );
};
const IDPs = (): JSX.Element => {
  return (
    <>
      <FormInputs
        title={"Total Number IDPs as of published date"}
        name={"totalNumOfIdps"}
        inputType="number"
        className="record-form-input"
        required
      />
    </>
  );
};
const RefugeesAndIdpsForm = () => {
  const [refugeesAndIdpsType, setRefugeesAndIdpsType] = useState<
    typeof RefugeesAndIdpsTypes[number]
  >(RefugeesAndIdpsTypes[0]);
  return (
    <>
      <FormInputs
        title={"Refugees And IDPs Type"}
        name={"refugeesAndIdpsType"}
        defaultDropDownValue={refugeesAndIdpsOptions[0]}
        dropDown={refugeesAndIdpsOptions}
        className="record-form-input"
        customDropdownFunc={(e: Option | MultiValue<Option> | null) => {
          if (isOption(e) && isRefugeesAndIdpsType(e.value))
            setRefugeesAndIdpsType(e.value);
        }}
      />
      {refugeesAndIdpsType === "Refugees" && <Refugees />}
      {refugeesAndIdpsType === "IDPs" && <IDPs />}
    </>
  );
};
export default RefugeesAndIdpsForm;
