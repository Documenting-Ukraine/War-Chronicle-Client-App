import { RecordSubmissionType } from "../../types";

const RecordContentBody = ({
  data,
  namespace,
  customEls
}: {
  data: RecordSubmissionType;
  namespace: string;
  customEls: JSX.Element
}) => {
  return <div className={`${namespace}-content-body`}>
    
  </div>;
};
export default RecordContentBody;
