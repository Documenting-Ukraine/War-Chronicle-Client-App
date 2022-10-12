import { Russia } from "../../../../types";
import {
  Corporations,
  SportsAndCulture,
  Sanctions,
  ProtestsInRussia,
} from "../../../../types/dataTypes/docTypes/Russia";
import RecordContentDataRow from "../../utilities/RecordContentDataRow";
import RecordContentDate from "../../utilities/RecordContentDate";
import RecordContentListItem from "../../utilities/RecordContentListItem";
const SanctionsPage = ({ data }: { data: Sanctions }) => {
  const countriesInvolved = data.countries
    ? data.countries.reduce((a, b) => `${a}, ${b}`, "")
    : "";
  return (
    <>
      <RecordContentDataRow heading="Sanction Info: ">
        <ul>
          <RecordContentListItem heading="Type: ">
            {data.sanction_type}
          </RecordContentListItem>
          {data.sanction_name && (
            <RecordContentListItem heading="Name: ">
              {data.sanction_name}
            </RecordContentListItem>
          )}
          {countriesInvolved && (
            <RecordContentListItem heading="Countries Involved: ">
              {countriesInvolved}
            </RecordContentListItem>
          )}
        </ul>
      </RecordContentDataRow>
    </>
  );
};
const CorporationsPage = ({ data }: { data: Corporations }) => {
  return (
    <>
      <RecordContentDataRow heading="Corporation:">
        <ul>
          <RecordContentListItem heading="Name: ">
            {data.corporation_name}
          </RecordContentListItem>
          <RecordContentListItem heading="Industry:">
            {data.corporation_industry}
          </RecordContentListItem>
        </ul>
      </RecordContentDataRow>
      <RecordContentDataRow heading="Response: ">
        <ul>
          <RecordContentListItem heading="Type">
            {data.russian_record_response_type}
          </RecordContentListItem>
          {data.russian_record_response_type === "Other" &&
            data.russian_record_custom_response_type && (
              <RecordContentListItem heading="Custom Type: ">
                {data.russian_record_custom_response_type}
              </RecordContentListItem>
            )}
          {data.donation_valuation && (
            <RecordContentListItem heading="Donation Value: ">
              {data.donation_valuation?.toString()}
            </RecordContentListItem>
          )}
        </ul>
      </RecordContentDataRow>
    </>
  );
};
const SportsAndCulturePage = ({ data }: { data: SportsAndCulture }) => {
  return (
    <>
      <RecordContentDataRow heading="Organization: ">
        <ul>
          <RecordContentListItem heading="Name: ">
            {data.organization_name}
          </RecordContentListItem>
          <RecordContentListItem heading="Type: ">
            {data.organization_type}
          </RecordContentListItem>
        </ul>
      </RecordContentDataRow>
      <RecordContentDataRow heading="Response: ">
        <ul>
          <RecordContentListItem heading="Type">
            {data.russian_record_response_type}
          </RecordContentListItem>
          {data.russian_record_response_type === "Other" &&
            data.russian_record_custom_response_type && (
              <RecordContentListItem heading="Custom Type: ">
                {data.russian_record_custom_response_type}
              </RecordContentListItem>
            )}
          {data.donation_valuation && (
            <RecordContentListItem heading="Donation Value: ">
              {data.donation_valuation?.toString()}
            </RecordContentListItem>
          )}
          <RecordContentListItem heading="Date of Announcement: ">
            <RecordContentDate
              date={data.date_of_announcement}
              prefix={""}
              namespace="record-pg"
            />
          </RecordContentListItem>
        </ul>
      </RecordContentDataRow>
    </>
  );
};
const ProtestsInRussiaPage = ({ data }: { data: ProtestsInRussia }) => {
  return (
    <>
      <RecordContentDataRow heading="Protest Info">
        <ul>
          {data.num_of_protesters && (
            <RecordContentListItem heading="Number of Protesters: ">
              {data.num_of_protesters?.toString()}
            </RecordContentListItem>
          )}
          {data.num_of_arrests && (
            <RecordContentListItem heading="Number of Arrests: ">
              {data.num_of_arrests.toString()}
            </RecordContentListItem>
          )}
          {data.num_of_hospitalizations && (
            <RecordContentListItem heading="Number of Hospitalizations">
              {data.num_of_hospitalizations.toString()}
            </RecordContentListItem>
          )}
          {data.state_response && (
            <RecordContentListItem heading="State Response: ">
              {data.state_response}
            </RecordContentListItem>
          )}
        </ul>
      </RecordContentDataRow>
    </>
  );
};
const RussiaPage = ({ data }: { data: Russia }) => {
  let formInputs = <></>;
  switch (data.russian_record_type) {
    case "Corporation Responses":
      formInputs = <CorporationsPage data={data} />;
      break;
    case "Protests in Russia":
      formInputs = <ProtestsInRussiaPage data={data} />;
      break;
    case "Sanctions vs. Russia":
      formInputs = <SanctionsPage data={data} />;
      break;
    case "Sports and Culture Responses":
      formInputs = <SportsAndCulturePage data={data} />;
      break;
    default:
      break;
  }
  return (
    <>
      {formInputs}
      {data.notes && (
        <div className="w-100 d-flex flex-column">
          <RecordContentDataRow heading="Notes: ">
            <>{data.notes}</>
          </RecordContentDataRow>
        </div>
      )}
    </>
  );
};
export default RussiaPage;
