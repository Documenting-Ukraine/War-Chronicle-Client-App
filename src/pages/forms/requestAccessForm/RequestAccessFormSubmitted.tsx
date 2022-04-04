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
    <div>
      <h2>{newHeading}</h2>
      <p>{value}</p>
    </div>
  );
};
const FormSubmitted = ({ data }: { data: DataPayLoad }): JSX.Element => {
  const dataKeys = Object.keys(data);
  return (
    <div>
      <Link to="/">Return to Home Page</Link>
      {dataKeys.map((heading) => (
        <FieldRow
          key={heading}
          heading={heading}
          value={data[heading as keyof DataPayLoad]}
        />
      ))}
    </div>
  );
};
export default FormSubmitted;
