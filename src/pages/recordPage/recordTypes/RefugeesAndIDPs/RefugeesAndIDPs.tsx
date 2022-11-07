import { RefugeesAndIdps } from "../../../../types";
import {
  Idps,
  Refugees,
} from "../../../../types/dataTypes/docTypes/RefugeesAndIdps";
import RecordContentDataRow from "../../utilities/RecordContentDataRow";
import RecordContentListItem from "../../utilities/RecordContentListItem";
import { Countries } from "../../../../types/dataTypes/DataLists";
const countriesMap: { [key: string]: typeof Countries[number][1] } = {};
Countries.forEach(([key, value]) => {
  countriesMap[key] = value;
});
const getLocaleDate = (date: Date, prefix?: string) => {
  return `${prefix ? prefix : ""}${new Date(date).toLocaleDateString("en-us", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })}`;
};
const namespace = "refugees-and-idps";
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
      <RecordContentDataRow heading="Refugees Info: ">
        <ul className={`${namespace}-container`}>
          <RecordContentListItem heading={"Total Displaced Refugees: "}>
            {data.total_num_of_refugees.toString() +
              " (" +
              getLocaleDate(new Date(data.date_first_published), "as of ") +
              ")"}
          </RecordContentListItem>
          <li className={`${namespace}-host-country`}>
            {data.host_country && (
              <RecordContentDataRow heading="Host Country: ">
                <ul>
                  {data.host_country.country_name && (
                    <RecordContentListItem heading="Country: ">
                      {countriesMap[data.host_country.country_name]
                        ? `${countriesMap[data.host_country.country_name]} (${
                            data.host_country.country_name
                          })`
                        : data.host_country.country_name}
                    </RecordContentListItem>
                  )}
                  <RecordContentListItem
                    heading={`Refugees In ${data.host_country.country_name}: `}
                  >
                    {data.host_country.refugees_in_host_country.toString() +
                      " (" +
                      getLocaleDate(
                        new Date(data.date_first_published),
                        "as of "
                      ) +
                      ")"}
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
