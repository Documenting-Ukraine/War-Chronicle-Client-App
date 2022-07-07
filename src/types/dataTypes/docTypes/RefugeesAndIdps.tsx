import { isInList } from "../DataLists";
import { GeneralRecordType } from "../GeneralRecordType";
type RefugeesAndIdpsGeneral = GeneralRecordType & {
  date_first_published: Date | string;
  record_type: "Refugees And IDPs";
};
export const RefugeesAndIdpsTypes = ["Refugees", "IDPs"] as const;
export const isRefugeesAndIdpsType = (
  e: string
): e is typeof RefugeesAndIdpsTypes[number] => isInList(e, RefugeesAndIdpsTypes);
type Refugees = RefugeesAndIdpsGeneral & {
  refugees_and_idps_type: "Refugees"
  total_num_of_refugees: number;
  host_country: {
    country_name: string;
    refugees_in_host_country: number;
  }
};
type Idps = RefugeesAndIdpsGeneral & {
  refugees_and_idps_type: "IDPs"
  total_num_of_idps: number;
};
type RefugeesAndIdps = Refugees | Idps;

export type { Refugees, Idps, RefugeesAndIdps };
