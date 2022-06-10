import { useState } from "react";
import {
  isOblastKey,
  OblastList,
  OblastRegion,
} from "../../../types/dataTypes/OblastRegionType";
import { MultiValue } from "react-select";
import {
  Option,
  isOption,
  transformSingleList,
  transfromOptions,
} from "../../../pages/authPage/data/OccupationList";
import FormInputs, { CustomFormInputs } from "./FormInputs";
const OblastKeys = Object.keys(OblastList);
const FormAddressInputs = () => {
  const [oblast, setOblast] = useState<keyof OblastRegion | undefined>();
  const [city, setCity] = useState<string>("");
  return (
    <CustomFormInputs name={"Address"} className="record-form-input" required>
      <section className="address-list-container">
        <FormInputs
          title="Oblast"
          name="Oblast"
          required
          dropDown={transformSingleList(OblastKeys)}
          customDropdownFunc={(e: Option | MultiValue<Option> | null) => {
            if (isOption(e) && isOblastKey(e.value)) {
              setOblast(e.value);
              setCity(OblastList[e.value][0]);
            }
          }}
        />
        {oblast && (
          <FormInputs
            title="City"
            name="City"
            required
            dropDown={transformSingleList(OblastList[oblast])}
            controlledDropDownValue={transfromOptions(city)}
            customDropdownFunc={(e: Option | MultiValue<Option> | null) => {
              if (isOption(e)) {
                setCity(e.value);
              }
            }}
          />
        )}

        <FormInputs
          title="Latitude"
          required={false}
          inputType={"text"}
          name={"Latitude"}
        />
        <FormInputs
          title="Longitude"
          name="Longitude"
          inputType="text"
          required={false}
        />
      </section>
    </CustomFormInputs>
  );
};
export default FormAddressInputs;
