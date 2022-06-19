import { RecordSubmissionType } from "../../../types";
export type LoadingStatus = { status: "loading" | "success" | "failed" };
export type SelectedRecord = {
  data: RecordSubmissionType | null;
};

export type SearchRecordData = {
  data: RecordSubmissionType[];
  idx_counter: number;
};
export type RecordFormReducerProps = {
  searched_data: SearchRecordData & LoadingStatus;
  selected_record: SelectedRecord & LoadingStatus;
  recently_updated_record: SelectedRecord & LoadingStatus;
};
