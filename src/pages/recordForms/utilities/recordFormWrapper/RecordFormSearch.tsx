import RecordItem from "../../../utilityComponents/recordItem/RecordItem";
import { RootState } from "../../../../store/rootReducer";
import { useSelector } from "react-redux";
import RecordFormBox from "./RecordFormBox";
import LoadingIcon from "../../../utilityComponents/loadingIcon/LoadingIcon";
import PopUpBg from "../../../utilityComponents/popUpBg/PopUpBg";
const guidelines = [
  "Be concise and specific. Avoid non-objective language",
  "No duplicate records. Reference our similar records to prevent duplicate creation",
  "Submit one entry at a time. Entries with multiple data sets will be removed",
];
const RecordFormSearch = (): JSX.Element => {
  const recordData = useSelector(
    (state: RootState) => state.recordForms.search.searched_data
  );
  const similarRecords = recordData.data;
  const status = recordData.status;
  return (
    <div className="record-form-pg-boxes">
      <RecordFormBox title={"Guidelines"} className="record-form-guidelines">
        <ol>
          {guidelines.map((str) => {
            const [bolded, nonBolded] = str.split(".");
            return (
              <li key={bolded}>
                <b>{bolded}.</b>
                {nonBolded}
              </li>
            );
          })}
        </ol>
      </RecordFormBox>
      <RecordFormBox
        title={"Similar Records"}
        className="record-form-similar-records"
      >
        <>
          {status === "loading" &&
            <PopUpBg fullViewport={false} className={"record-form-similar-records-loading-icon"}>
              <LoadingIcon backgroundColor="white" />
            </PopUpBg>
          }

          {similarRecords.map((record) => (
            <RecordItem
              key={record._id}
              id={record._id}
              title={record.record_title}
              recordType={record.record_type}
              description={record.description}
              creationDate={record.record_creation_date}
            />
          ))}
          {similarRecords.length <= 0 && (
            <div className="d-flex w-100 h-100 justify-content-center align-items-center flex-grow-1">
              No records found.
            </div>
          )}
        </>
      </RecordFormBox>
    </div>
  );
};
export default RecordFormSearch;
