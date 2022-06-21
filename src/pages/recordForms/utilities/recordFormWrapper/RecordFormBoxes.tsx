import RecordItem, { RecordProperties } from "./RecordItem";
import RecordFormBox from "./RecordFormBox";
const guidelines = [
  "Be concise and specific. Avoid non-objective language",
  "No duplicate records. Reference our similar records to prevent duplicate creation",
  "Submit one entry at a time. Entries with multiple data sets will be removed",
];
const RecordFormBoxes = ({
  similarRecords,
}: {
  similarRecords: RecordProperties[];
}): JSX.Element => {
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
            <div className="d-flex w-100 h-100 justify-content-center align-items-center">
              No records found.
            </div>
          )}
        </>
      </RecordFormBox>
    </div>
  );
};
export default RecordFormBoxes;
