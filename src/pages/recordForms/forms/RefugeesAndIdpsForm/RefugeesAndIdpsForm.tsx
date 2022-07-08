import FormInputs from "../../../utilityComponents/formInputs/FormInputs";
import {
  isOption,
  Option,
  transformSingleList,
  transformOptions,
} from "../../../authPage/data/OccupationList";
import { MultiValue } from "react-select";
import {
  isRefugeesAndIdpsType,
  RefugeesAndIdps,
  RefugeesAndIdpsTypes,
} from "../../../../types/dataTypes/docTypes/RefugeesAndIdps";
import { useEffect, useState } from "react";
import Refugees from "./RefugeesInputs";
import IDPs from "./IDPsInputs";
import useRecordFormPropUpdate from "../../../../hooks/use-record-form-prop-update";
import RefugeesAndIdpsTemplate from "./RefugeesAndIdpsTemplate";
const refugeesAndIdpsOptions = transformSingleList([...RefugeesAndIdpsTypes]);
const RefugeesAndIdpsForm = ({
  defaultInputs,
}: {
  defaultInputs?: RefugeesAndIdps;
}) => {
  const updateStoreProps = useRecordFormPropUpdate("Refugees And IDPs");
  const [refugeesAndIdpsType, setRefugeesAndIdpsType] = useState<
    typeof RefugeesAndIdpsTypes[number]
  >(
    defaultInputs?.refugees_and_idps_type
      ? defaultInputs.refugees_and_idps_type
      : RefugeesAndIdpsTypes[0]
  );
  useEffect(() => {
    updateStoreProps({
      refugees_and_idps_type: refugeesAndIdpsType,
    });
  }, [refugeesAndIdpsType, updateStoreProps]);
  return (
    <RefugeesAndIdpsTemplate
      refugeesAndIdpsType={refugeesAndIdpsType}
      refugeesEl={<Refugees defaultInputs ={defaultInputs} />}
      idpsEl={<IDPs defaultInputs = {defaultInputs}/>}
    >
      <>
        <FormInputs
          title={"Refugees And IDPs Type"}
          name={"refugeesAndIdpsType"}
          defaultDropDownValue={
            refugeesAndIdpsType
              ? transformOptions(refugeesAndIdpsType)
              : undefined
          }
          dropDown={refugeesAndIdpsOptions}
          className="record-form-input"
          customDropdownFunc={(e: Option | MultiValue<Option> | null) => {
            if (isOption(e) && isRefugeesAndIdpsType(e.value)) {
              setRefugeesAndIdpsType(e.value);
            }
          }}
        />
      </>
    </RefugeesAndIdpsTemplate>
  );
};
export default RefugeesAndIdpsForm;
