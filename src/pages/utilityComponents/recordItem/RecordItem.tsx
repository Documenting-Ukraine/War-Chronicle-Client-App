import { Link } from "react-router-dom";
import { RecordSubmissionType } from "../../../types";

export type RecordProperties = Pick<
  RecordSubmissionType,
  | "_id"
  | "record_title"
  | "record_type"
  | "description"
  | "record_creation_date"
>;
interface RecordItemProps {
  id: RecordProperties["_id"];
  title: RecordProperties["record_title"];
  description: RecordProperties["description"];
  creationDate: RecordProperties["record_creation_date"];
  recordType: RecordProperties["record_type"];
}
const RecordItem = ({
  id,
  title,
  description,
  creationDate,
  recordType,
}: RecordItemProps) => {
  return (
    <Link to={`/search/records/${id}`} className="record-form-record-item">

      <h5 className="record-item-heading">{title}</h5>
      <p className="record-item-body">{description}</p>
      <div className="record-item-footer">
      <div className="record-item-type">
        <span>
          <b>Category: </b>
          {recordType}
        </span>
      </div>
        <div>
          Created on{" "}
          {new Date(creationDate).toLocaleDateString("en-us", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </div>
      </div>
    </Link>
  );
};
export default RecordItem;
