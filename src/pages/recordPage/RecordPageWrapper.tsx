import { useRealmApp } from "../../realm/RealmApp";
import { RecordSubmissionType } from "../../types";
import RecordContentBody from "./RecordContentBody";
import RecordContentHeader from "./RecordContentHeader";
const RecordPageWrapper = ({
  children,
  data,
}: {
  children: JSX.Element;
  data: RecordSubmissionType;
}) => {
  const namespace = "record-pg";
  const app = useRealmApp();
  return (
    <>
      <RecordContentHeader app={app} namespace={namespace} data={data} />
      <RecordContentBody
        namespace={namespace}
        data={data}
        customEls={children}
      />
    </>
  );
};
export default RecordPageWrapper;
