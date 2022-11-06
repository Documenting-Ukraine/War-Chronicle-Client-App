export const RecordContentDate = ({
  lineSpace = true,
  date,
  prefix,
  namespace,
}: {
  lineSpace?: boolean;
  date: string | Date;
  prefix: string;
  namespace: string;
}) => {
  return (
    <span className={`${namespace}-date-item`}>
      {prefix}
      {lineSpace && <br />}
      {new Date(date).toLocaleString("en-us", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })}
    </span>
  );
};
export default RecordContentDate;
