import { RecordSubmissionType } from "../../../types";
export type LoadingStatus = { status: "loading" | "success" | "failed" };
export type SelectedRecord = {
  data: RecordSubmissionType | null;
};

export type SearchRecordData = {
  data: RecordSubmissionType[];
  pagination_end: boolean;
  prev_search: string;
  idx_counter: number;
};
export type RecordFormReducerProps = {
  searched_data: SearchRecordData & LoadingStatus;
  selected_record: SelectedRecord & LoadingStatus;
};
