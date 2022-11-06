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
const generalNamespace = "record-pg";
const internationalNamespace = "international-pg";
const AidForm = (data: MilitaryAid | HumanitarianAid) => {
  return (
    <>
      <RecordContentDataRow heading="Aid: ">
        <ul>
          <RecordContentListItem heading="Type: ">
            {data.international_response_type}
          </RecordContentListItem>

          <RecordContentListItem heading="Valuation: ">
            {data.aid_valuation.toString()}
          </RecordContentListItem>
          <RecordContentListItem heading="Announced: ">
            <RecordContentDate
              date={data.date_aid_is_announced}
              prefix={""}
              lineSpace={false}
              namespace={generalNamespace}
            />
          </RecordContentListItem>
        </ul>
      </RecordContentDataRow>
      <RecordContentDataRow heading="Has Aid Been Recieved? ">
        <ul>
          <RecordContentListItem heading="Aid Sent: ">
            {data.aid_sent ? data.aid_sent : "N/A"}
          </RecordContentListItem>
          {data.aid_sent === "Yes" && data.date_aid_is_sent && (
            <RecordContentListItem heading="Date Sent: ">
              <RecordContentDate
                date={data.date_aid_is_sent}
                prefix={""}
                lineSpace={false}
                namespace={generalNamespace}
              />
            </RecordContentListItem>
          )}
        </ul>
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
        <ul>
          <RecordContentListItem heading="Permission Granted: ">
            <>
              {data.permission_granted_to_citizens
                ? data.permission_granted_to_citizens
                : "N/A"}
            </>
          </RecordContentListItem>
          {data.permission_granted_to_citizens === "Yes" &&
            data.date_permission_granted && (
              <RecordContentListItem heading="Date Granted: ">
                <div className={`${internationalNamespace}-permission-granted`}>
                  <RecordContentDate
                    lineSpace={false}
                    date={data.date_permission_granted}
                    prefix={""}
                    namespace={generalNamespace}
                  />
                </div>
              </RecordContentListItem>
            )}
        </ul>
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
