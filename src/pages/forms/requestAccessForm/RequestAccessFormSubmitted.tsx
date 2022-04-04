import { DataPayLoad } from "./RequestAccessForm";
import { Link } from "react-router-dom";
const FieldRow = ({
  heading,
  value,
}: {
  heading: string;
  value: string | undefined;
}) => {
  const parseSnakeCase = heading
    .split("_")
    .map((word) => word[0].toUpperCase() + word.substring(1, word.length));
  const newHeading = parseSnakeCase.reduce(
    (prev, curr) => prev + " " + curr,
    ""
  );
  return (
    <div className="request-form-submitted-inputs">
      <h2>{newHeading}</h2>
      <p>{value}</p>
    </div>
  );
};

const FormSubmitted = ({ data }: { data: DataPayLoad }): JSX.Element => {
  const dataKeys = Object.keys(data);
  return (
    <div className="request-form-submitted">
      <Link to="/">Return To Home</Link>
      <p>We've recieved your request! You will hear from us soon</p>
      <h1 id="request-submitted-form-heading">Submission Details</h1>
      <div id="request-submitted-inputs-container">
        {dataKeys.map((heading) => (
          <FieldRow
            key={heading}
            heading={heading}
            value={data[heading as keyof DataPayLoad]}
          />
        ))}
      </div>
    </div>
  );
};
export default FormSubmitted;
