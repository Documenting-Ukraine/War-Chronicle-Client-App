import { RefugeesAndIdps } from "../../../../types";
import {
  Idps,
  Refugees,
} from "../../../../types/dataTypes/docTypes/RefugeesAndIdps";
import RecordContentDataRow from "../../utilities/RecordContentDataRow";
import RecordContentListItem from "../../utilities/RecordContentListItem";
const IDPsPage = ({ data }: { data: Idps }) => {
  return (
    <>
      <RecordContentDataRow heading="IDPs: ">
        <ul>
          <RecordContentListItem heading="Number of IDPs: ">
            {data.total_num_of_idps.toString()}
          </RecordContentListItem>
        </ul>
      </RecordContentDataRow>
    </>
  );
};
const RefugeesPage = ({ data }: { data: Refugees }) => {
  return (
    <>
      <RecordContentDataRow heading="Refugees: ">
        <ul>
          <RecordContentListItem heading="Total Number of Refugees as of publication">
            {data.total_num_of_refugees.toString()}
          </RecordContentListItem>
          <li>
            {data.host_country && (
              <RecordContentDataRow heading="Host Country">
                <ul>
                  {data.host_country.country_name && (
                    <RecordContentListItem heading="Name">
                      {data.host_country.country_name}
                    </RecordContentListItem>
                  )}
                  <RecordContentListItem heading="Number of Refugees In Country">
                    {data.host_country.refugees_in_host_country.toString()}
                  </RecordContentListItem>
                </ul>
              </RecordContentDataRow>
            )}
          </li>
        </ul>
      </RecordContentDataRow>
    </>
  );
};
const RefugeesAndIdpsPage = ({ data }: { data: RefugeesAndIdps }) => {
  let formInputs: JSX.Element;
  switch (data.refugees_and_idps_type) {
    case "IDPs":
      formInputs = <IDPsPage data={data} />;
      break;
    case "Refugees":
      formInputs = <RefugeesPage data={data} />;
      break;
  }
  return <>{formInputs}</>;
};
export default RefugeesAndIdpsPage;
