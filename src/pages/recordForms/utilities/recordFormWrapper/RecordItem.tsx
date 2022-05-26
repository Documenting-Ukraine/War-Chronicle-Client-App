import { ObjectId } from "mongodb";
import {Link} from "react-router-dom"
interface RecordItemProps {
  id: string | ObjectId;
  title: string;
  description: string;
  creationDate: string | Date;
  recordType: string;
}
const RecordItem = ({
  id,
  title,
  description,
  creationDate,
  recordType,
}: RecordItemProps) => {
  return (
      <Link to={`/search/records/${id}`} className="record-item">
      <div>
        <h5>{title}</h5>
        <label>{recordType}</label>
      </div>
      <p>{description}</p>
      <div>
        Created on{" "}
        {new Date(creationDate).toLocaleDateString("en-us", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })}
      </div>
    </Link>
  );
};
export default RecordItem;
