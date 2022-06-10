import { GeneralRecordType } from "../GeneralRecordType";
import { Disinformation } from "../DataLists";

type MediaAndDisInfoGeneral = GeneralRecordType & {
  record_type: "Media And Disinformation";
  article_title: string;
  primary_language: string;
  hosting_outlet: string;
  original_outlet?: string;
  date_first_published: Date | string;
  date_of_most_recent_edit: Date;
  author: string;
  //    mediaType: typeof MediaTypes,
  editorial_stance: {
    stance: string;
    quote: string;
  };
  disinformation?: typeof Disinformation[number];
  notes: string;
};

type Russia = MediaAndDisInfoGeneral;
type China = MediaAndDisInfoGeneral;
type Western = MediaAndDisInfoGeneral;
type MediaAndDisInformation = Russia | China | Western;
export type {
  MediaAndDisInfoGeneral,
  Russia,
  China,
  Western,
  MediaAndDisInformation,
};
