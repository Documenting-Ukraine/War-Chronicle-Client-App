import { RecordSubmissionType } from "../../../types";
import { CategoriesList } from "../../../types/dataTypes/CategoryIconMap";

export type LoadingStatus = { status: "loading" | "success" | "failed" };

export type SelectedRecord = {
  data: RecordSubmissionType | null;
};
export type RecordFormSearchQuery = {
  [key: string]: any;
  value: string;
  _ids?: string[];
  categories?: typeof CategoriesList[number][];
  containsMedia?: boolean;
  date?: {
    eventDate?: {
      startDate: Date | string;
      endDate: Date | string;
    };
    recordCreation?: {
      startDate: Date | string;
      endDate: Date | string;
    };
  };
};
export type SearchRecordData = {
  data: RecordSubmissionType[];
  pagination_end: boolean;
  prev_search: RecordFormSearchQuery;
  idx_counter: number;
};
export type RecordFormReducerProps = {
  searched_data: SearchRecordData & LoadingStatus;
  selected_record: SelectedRecord & LoadingStatus;
};
