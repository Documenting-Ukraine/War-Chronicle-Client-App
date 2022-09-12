export const RecordContentDataRow = ({
  heading,
  children,
  namespace = "record-pg",
}: {
  heading: string;
  children: JSX.Element;
  namespace?: string;
}) => {
  return (
    <div className={`${namespace}-data-row`}>
      <h4>{heading}</h4>
      <div className={`${namespace}-data-row-body`}>{children}</div>
    </div>
  );
};
export default RecordContentDataRow