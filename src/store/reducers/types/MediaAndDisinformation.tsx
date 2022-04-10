import { Media } from "./GeneralRecordType";
import {Disinformation} from "./DataLists"
//const MediaTypes = [] as const 
interface MediaAndDisInfoGeneral {
  title: string;
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
  disinformation?: typeof Disinformation;
  notes: string;
  media: Media;
}
type Russia = MediaAndDisInfoGeneral
type China = MediaAndDisInfoGeneral
type Western = MediaAndDisInfoGeneral
type MediaAndDisInformation = Russia | China | Western
export type {
    MediaAndDisInfoGeneral,
    Russia, China, Western,
    MediaAndDisInformation
}