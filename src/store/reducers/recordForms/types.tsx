import { RecordSubmissionType } from "../../../types";
import { CategoriesList } from "../../../types/dataTypes/CategoryIconMap";

export type LoadingStatus = { status: "loading" | "success" | "failed" };

export type SelectedRecord = {
  data: RecordSubmissionType | null;
};
export type RecordFormSearchQuery = {
  [key: string]: any;
  value?: string;
  _ids?: string[];
  categories?: string[];
  containsMedia?: boolean | null;
  date?: {
    eventDate?: {
      startDate: Date | string;
      endDate: Date | string;
      sortBy?: 'oldest' | 'newest'
    };
    recordCreation?: {
      startDate: Date | string;
      endDate: Date | string;
      sortBy?: 'oldest' | 'newest'
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
