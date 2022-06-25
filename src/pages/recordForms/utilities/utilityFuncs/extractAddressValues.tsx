import {
  Address,
  isAddressKey,
} from "../../../../types/dataTypes/GeneralRecordType";
import {
  isCity,
  isOblastKey,
} from "../../../../types/dataTypes/OblastRegionType";
import { FormDataIndexType } from "./extractStringFormData";
export const extractAddressValues = (
  formData: FormDataIndexType
): Partial<Address> | undefined => {
  const addressKeyValueArr = Object.entries(formData).filter(([key, value]) =>
    isAddressKey(key)
  );
  const addressObject: Partial<Address> = {};
  for (let [key, value] of addressKeyValueArr) {
    switch (key) {
      case "oblast":
        const oblastValue = value.toString();
        if (isOblastKey(oblastValue)) addressObject[key] = oblastValue;
        break;
      case "city":
        const cityValue = value.toString();
        if (
          formData["oblast"] &&
          isCity(formData["oblast"].toString(), cityValue)
        )
          addressObject[key] = cityValue;
        break;
      case "longitude":
        addressObject[key] = value.toString();
        break;
      case "latitude":
        addressObject[key] = value.toString();
        break;
      default:
        break;
    }
  }
  if (Object.keys(addressObject).length <= 0) return undefined;
  return addressObject;
};
