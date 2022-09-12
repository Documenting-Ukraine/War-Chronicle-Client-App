export const RecordContentDate = ({
  date,
  prefix,
  namespace,
}: {
  date: string | Date;
  prefix: string;
  namespace: string;
}) => {
  return (
    <span className={`${namespace}-date-item`}>
      {prefix}
      <br />
      {new Date(date).toLocaleString("en-us", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })}
    </span>
  );
};
export default RecordContentDate;
