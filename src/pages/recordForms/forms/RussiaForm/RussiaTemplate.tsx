import { RussianRecordTypes } from "../../../../types/dataTypes/DataLists";
const RussiaTemplate = ({
  russianRecordType,
  corporationsEl,
  protestsEl,
  sanctionsEl,
  sportsEl,
  children
}: {
  russianRecordType: typeof RussianRecordTypes[number] | undefined;
  corporationsEl?: JSX.Element;
  protestsEl?: JSX.Element;
  sanctionsEl?: JSX.Element;
  sportsEl?: JSX.Element;
  children?: JSX.Element
}) => {
  return (
    <>
        {children}
      {russianRecordType === "Corporation Responses" && corporationsEl}
      {russianRecordType === "Protests in Russia" && protestsEl}
      {russianRecordType === "Sanctions vs. Russia" && sanctionsEl}
      {russianRecordType === "Sports and Culture Responses" && sportsEl}
    </>
  );
};
export default RussiaTemplate;
