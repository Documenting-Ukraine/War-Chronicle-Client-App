import { GeneralRecordType } from "./GeneralRecordType";
type RefugeesAndIdpsGeneral = Omit<GeneralRecordType, "address"> & {
  datePublished: Date;
  source: string;
};
type Refugees = RefugeesAndIdpsGeneral & {
    totalNumOfRefugees: number, 
    hostCountry: string,
    refugeesInHostCountry: number,
}
type Idps = RefugeesAndIdpsGeneral & {
    totalNumOfIdps: number 
}
type RefugeesAndIdps = Refugees | Idps

export type {Refugees, Idps, RefugeesAndIdps}
