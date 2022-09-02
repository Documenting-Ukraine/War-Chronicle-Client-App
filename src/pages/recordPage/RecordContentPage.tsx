import { RecordSubmissionType } from "../../types";
import { useRealmApp } from "../../realm/RealmApp";
import RecordContentHeader from "./RecordContentHeader";
import RecordContentBody from "./RecordContentBody";
const RecordContentPage = ({ data }: { data: RecordSubmissionType }) => {
  const app = useRealmApp();
  const namespace = "record-pg";
  return (
    <div id={`${namespace}-record-content`}>
      <RecordContentHeader data={data} namespace={namespace} app={app} />
      <RecordContentBody data={data} namespace={namespace} />
    </div>
  );
};
export default RecordContentPage;
