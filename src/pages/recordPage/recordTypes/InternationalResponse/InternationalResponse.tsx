import { InternationalResponse } from "../../../../types";
import {
  CombatPermission,
  HumanitarianAid,
  MilitaryAid,
  UNRecord,
} from "../../../../types/dataTypes/docTypes/InternationalResponse";
import RecordContentDataRow from "../../utilities/RecordContentDataRow";
import RecordContentDate from "../../utilities/RecordContentDate";
import RecordContentListItem from "../../utilities/RecordContentListItem";
const namespace = "record-pg";
const AidForm = (data: MilitaryAid | HumanitarianAid) => {
  return (
    <>
      <RecordContentDataRow heading="Aid: ">
        <ul>
          <RecordContentListItem heading="Type: ">
            {data.general_aid_type}
          </RecordContentListItem>

          <RecordContentListItem heading="Valuation: ">
            {data.aid_valuation.toString()}
          </RecordContentListItem>
          <RecordContentListItem heading="Announced: ">
            <RecordContentDate
              date={data.date_aid_is_announced}
              prefix={""}
              namespace={namespace}
            />
          </RecordContentListItem>
        </ul>
      </RecordContentDataRow>
      <RecordContentDataRow heading="Has Aid Been Recieved? ">
        <>
          {data.aid_sent === "Yes" && data.date_aid_is_sent ? (
            <RecordContentDate
              date={data.date_aid_is_sent}
              prefix={"Sent on"}
              namespace={namespace}
            />
          ) : data.aid_sent === "No" ? (
            "Aid Not Sent"
          ) : (
            "N/A"
          )}
        </>
      </RecordContentDataRow>
    </>
  );
};
const UNRecordForm = (data: UNRecord) => {
  return (
    <RecordContentDataRow heading="Resolution:">
      <>{data.resolution_name}</>
    </RecordContentDataRow>
  );
};
const CombatPermissionForm = (data: CombatPermission) => {
  return (
    <>
      <RecordContentDataRow heading="Combat Information: ">
        <ul>
          {data.num_of_volunteers && (
            <RecordContentListItem heading="Number of Volunteers: ">
              {data.num_of_volunteers.toString()}
            </RecordContentListItem>
          )}
        </ul>
      </RecordContentDataRow>
      <RecordContentDataRow heading="Citizens Granted Combat Permission?">
        <>
          {data.permission_granted_to_citizens === "Yes" &&
          data.date_permission_granted ? (
            <RecordContentDate
              date={data.date_permission_granted}
              prefix={"Permission Granted On"}
              namespace={namespace}
            />
          ) : data.permission_granted_to_citizens === "No" ? (
            "Permission Not Granted"
          ) : (
            "N/A"
          )}
        </>
      </RecordContentDataRow>
    </>
  );
};
const MilitaryAidForm = (data: MilitaryAid) => {
  return AidForm(data);
};
const HumanitarianAidForm = (data: HumanitarianAid) => {
  return AidForm(data);
};
const InternationalResponsePage = ({
  data,
}: {
  data: InternationalResponse;
}) => {
  let pageInputs: JSX.Element;
  switch (data.international_response_type) {
    case "Combat Permission":
      pageInputs = CombatPermissionForm(data);
      break;
    case "Humanitarian Aid":
      pageInputs = HumanitarianAidForm(data);
      break;
    case "Military Aid":
      pageInputs = MilitaryAidForm(data);
      break;
    case "United Nations Resolution":
      pageInputs = UNRecordForm(data);
      break;
  }
  const participatingCountries = data.participating_countries
    ? data.participating_countries.reduce((a, b) => `${a}, ${b}`, "")
    : "";
  return (
    <>
      <RecordContentDataRow heading="Participating Countries">
        <>
          {participatingCountries.substring(1, participatingCountries.length)}
        </>
      </RecordContentDataRow>
      {pageInputs}
    </>
  );
};
export default InternationalResponsePage;
