import { GeneralEventType } from "./GeneralRecordType";
type RefugeesAndIdpsGeneral = Omit<GeneralEventType, "address"> & {
  recordType: "Refugees And Idps";
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
