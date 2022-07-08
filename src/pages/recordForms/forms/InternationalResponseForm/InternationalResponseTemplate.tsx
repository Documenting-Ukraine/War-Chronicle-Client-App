import { InternationalResponseType } from "../../../../types/dataTypes/DataLists";

const InternationalResponseTemplate = ({
  responseType,
  unResolutionEl,
  combatPermissionEl,
  humanitarianAidEl,
  militaryAidEl,
  children,
}: {
  responseType: typeof InternationalResponseType[number] | undefined;
  unResolutionEl?: JSX.Element;
  combatPermissionEl?: JSX.Element;
  humanitarianAidEl?: JSX.Element;
  militaryAidEl?: JSX.Element;
  children?: JSX.Element;
}) => {
  return (
    <>
      {children}
      {responseType === "United Nations Resolution" && unResolutionEl}
      {responseType === "Combat Permission" && combatPermissionEl}
      {responseType === "Humanitarian Aid" && humanitarianAidEl}
      {responseType === "Military Aid" && militaryAidEl}
    </>
  );
};
export default InternationalResponseTemplate;
