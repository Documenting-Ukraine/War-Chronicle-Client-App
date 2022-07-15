import { useState, useEffect } from "react";
import useRecordFormPropUpdate from "../../../../hooks/use-record-form-prop-update";
import FormInputs, {
  CustomFormInputs,
} from "../../../utilityComponents/formInputs/FormInputs";
import { RefugeesAndIdps } from "../../../../types";
const Refugees = ({
  defaultInputs,
}: {
  defaultInputs?: RefugeesAndIdps;
}): JSX.Element => {
  const updateStoreProps = useRecordFormPropUpdate("Refugees And IDPs");
  const refugeeType = defaultInputs?.refugees_and_idps_type === "Refugees";
  const [countryName, setCountryName] = useState(
    refugeeType && defaultInputs?.host_country?.country_name
      ? defaultInputs.host_country.country_name
      : ""
  );
  const [refugeesInCountry, setRefugeesInCountry] = useState(
    refugeeType && defaultInputs?.host_country?.refugees_in_host_country
      ? defaultInputs.host_country.refugees_in_host_country
      : 0
  );
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
        defaultValue={
          refugeeType
            ? defaultInputs?.total_num_of_refugees.toString()
            : undefined
        }
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
            defaultValue={countryName}
          />
          <FormInputs
            title={"UKR Refugees in Country as of published date"}
            name={"refugeesInHostCountry"}
            inputType="number"
            className="record-form-input"
            required
            defaultValue={refugeesInCountry.toString()}
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
