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
import { Address } from "../../../types/dataTypes/GeneralRecordType";
const OblastKeys = Object.keys(OblastList);
const FormAddressInputs = ({
  defaultAddress,
}: {
  defaultAddress?: Address;
}) => {
  const [oblast, setOblast] = useState<keyof OblastRegion | undefined>(
    defaultAddress ? defaultAddress.oblast : undefined
  );
  const [city, setCity] = useState<string>(
    defaultAddress ? defaultAddress.city : ""
  );
  return (
    <CustomFormInputs
      title="Event Location"
      name={"Address"}
      className="record-form-input"
      required
    >
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
          defaultDropDownValue={
            defaultAddress ? transfromOptions(defaultAddress.oblast) : undefined
          }
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
            defaultDropDownValue={
              defaultAddress ? transfromOptions(defaultAddress.city) : undefined
            }
          />
        )}

        <FormInputs
          title="Latitude"
          required={false}
          inputType={"text"}
          name={"Latitude"}
          defaultValue={
            defaultAddress && defaultAddress.latitude
              ? defaultAddress.latitude
              : ""
          }
        />
        <FormInputs
          title="Longitude"
          name="Longitude"
          inputType="text"
          required={false}
          defaultValue={
            defaultAddress && defaultAddress.longitude
              ? defaultAddress.longitude
              : ""
          }
        />
      </section>
    </CustomFormInputs>
  );
};
export default FormAddressInputs;