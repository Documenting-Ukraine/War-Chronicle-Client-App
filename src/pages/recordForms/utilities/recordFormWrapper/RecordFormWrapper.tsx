interface RecordFormWrapperProps {
  children: JSX.Element;
}
const RecordFormWrapper = ({
  children,
}: RecordFormWrapperProps): JSX.Element => {
    return <div>{ children }</div>;
};
export default RecordFormWrapper;
