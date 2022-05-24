interface RecordFormWrapperProps {
  children: JSX.Element;
}
const RecordFormWrapper = ({
  children,
}: RecordFormWrapperProps): JSX.Element => {
  return <div className="record-form-pg-wrapper">
    {children}
  </div>;
  <div>
    
  </div>
};
export default RecordFormWrapper;
