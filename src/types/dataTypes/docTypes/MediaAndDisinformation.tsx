import { GeneralRecordType } from "../GeneralRecordType";
import { Disinformation } from "../DataLists";

type MediaAndDisInfoGeneral = GeneralRecordType & {
  record_type: "Media And Disinformation";
  articleTitle: string;
  primaryLanguage: string;
  hostingOutlet: string;
  originalOutlet?: string;
  dateOfPublication: Date;
  dateOfMostRecentEdit: Date;
  author: string;
  //    mediaType: typeof MediaTypes,
  editorialStance: {
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
