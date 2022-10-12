import { ProtestsAbroad } from "../../../../types";
import RecordContentDataRow from "../../utilities/RecordContentDataRow";
import RecordContentListItem from "../../utilities/RecordContentListItem";

const ProtestsAbroadPage = ({ data }: { data: ProtestsAbroad }) => {
  return (
    <>
      <RecordContentDataRow heading="Protest Info: ">
        <ul>
          <RecordContentListItem heading="Location: ">
            {data.protest_location}
          </RecordContentListItem>
          {data.num_of_arrests && (
            <RecordContentListItem heading="Number of Arrests: ">
              {data.num_of_arrests.toString()}
            </RecordContentListItem>
          )}
          {data.num_of_hospitalizations && (
            <RecordContentListItem heading="Number of Hospitalizations: ">
              {data.num_of_hospitalizations.toString()}
            </RecordContentListItem>
          )}
          {data.num_of_protesters && (
            <RecordContentListItem heading="Number of Protesters: ">
              {data.num_of_protesters.toString()}
            </RecordContentListItem>
          )}
        </ul>
      </RecordContentDataRow>
    </>
  );
};
export default ProtestsAbroadPage;
