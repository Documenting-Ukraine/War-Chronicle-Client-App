import { useState, useEffect } from "react";
import useRecordFormPropUpdate from "../../../../hooks/use-record-form-prop-update";
import FormInputs, {
  CustomFormInputs,
} from "../../../utilityComponents/formInputs/FormInputs";
const Refugees = (): JSX.Element => {
    const updateStoreProps = useRecordFormPropUpdate();
  const [countryName, setCountryName] = useState("");
  const [refugeesInCountry, setRefugeesInCountry] = useState(0);
  useEffect(() => {
    updateStoreProps({
      host_country: {
        country_name: countryName,
        refugees_in_host_country: refugeesInCountry,
      },
    });
  }, [updateStoreProps, countryName, refugeesInCountry]);
  return (
    <>
      <FormInputs
        title={"Total Number of UKR Refugees Worldwide as of published date"}
        name={"totalNumOfRefugees"}
        inputType="number"
        className="record-form-input"
        required
        customValidation={(e) => {
          updateStoreProps({
            total_num_of_idps: parseInt(e),
          });
          return { err: false, message: "" };
        }}
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
            customValidation={(e) => {
                setCountryName(e);
                return { err: false, message: "" };
              }}
          />
          <FormInputs
            title={"UKR Refugees in Country as of published date"}
            name={"refugeesInHostCountry"}
            inputType="number"
            className="record-form-input"
            required
            customValidation={(e) => {
                setRefugeesInCountry(parseInt(e));
                return { err: false, message: "" };
              }}
          />
        </>
      </CustomFormInputs>
    </>
  );
};
export default Refugees;
