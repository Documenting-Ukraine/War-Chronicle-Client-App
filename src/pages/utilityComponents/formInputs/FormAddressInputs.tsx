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
  transfromOptions,
  transformSingleList,
} from "../../../pages/authPage/data/OccupationList";
import FormInputs, { CustomFormInputs } from "./FormInputs";
const OblastKeys = Object.keys(OblastList);
const FormAddressInputs = () => {
  const [oblast, setOblast] = useState<keyof OblastRegion>(
    isOblastKey(OblastKeys[0]) ? OblastKeys[0] : "Cherkasy"
  );
  const [city, setCity] = useState(
    isOblastKey(OblastKeys[0])
      ? OblastList[OblastKeys[0]]
      : OblastList["Cherkasy"][0]
  );

  return (
    <CustomFormInputs name={"Address"} className="record-form-input" required>
      <section>
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
        <FormInputs
          title="City"
          name="City"
          required
          dropDown={transformSingleList(OblastList[oblast])}
        />
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
