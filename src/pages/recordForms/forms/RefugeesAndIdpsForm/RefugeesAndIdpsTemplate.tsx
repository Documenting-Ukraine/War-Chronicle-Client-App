import { RefugeesAndIdpsTypes } from "../../../../types/dataTypes/docTypes/RefugeesAndIdps";

const RefugeesAndIdpsTemplate = ({
  refugeesAndIdpsType,
  refugeesEl,
  idpsEl,
  children,
}: {
  refugeesAndIdpsType: typeof RefugeesAndIdpsTypes[number];
  children?: JSX.Element;
  refugeesEl?: JSX.Element;
  idpsEl?: JSX.Element;
}) => {
  return (
    <>
      {children}
      {refugeesAndIdpsType === "Refugees" && refugeesEl}
      {refugeesAndIdpsType === "IDPs" && idpsEl}
    </>
  );
};
export default RefugeesAndIdpsTemplate;
