import { faLink, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createContext, useState } from "react";
import { MultiValue } from "react-select";
import { RecordSubmissionType } from "../../../../types";
import {
  isOption,
  Option,
  transformOptions,
  transformSingleList,
} from "../../../authPage/data/OccupationList";
import FormDropZone from "../../../utilityComponents/formInputs/FormDropZone/FormDropZone";
import FormInputs, {
  CustomFormInputs,
} from "../../../utilityComponents/formInputs/FormInputs";
const MediaTypes = ["images", "videos"] as const;
const MediaTypesList = [...transformSingleList(MediaTypes)];
const MediaTypeContext = createContext<{
  mediaType: typeof MediaTypes[number];
}>({ mediaType: "images" });
function isMediaType(e: any): e is typeof MediaTypes[number] {
  try {
    return MediaTypes.includes(e);
  } catch (err) {
    return false;
  }
}
const MediaWrapper = ({ children }: { children: JSX.Element }) => {
  const [mediaType, setMediaType] = useState<typeof MediaTypes[number]>(
    MediaTypes[0]
  );
  return (
    <div>
      <FormInputs
        title="Media Type"
        name={"media-type"}
        className={"record-form-input"}
        dropDown={MediaTypesList}
        defaultDropDownValue={transformOptions(mediaType)}
        customDropdownFunc={(e: Option | MultiValue<Option> | null) => {
          if (isOption(e) && isMediaType(e.value)) setMediaType(e.value);
        }}
        required
      />
      {children}
    </div>
  );
};
const MediaThumbnails = ({
  defaultInputs,
}: {
  defaultInputs?: RecordSubmissionType;
}) => {
  return <div className="record-form-media-thumbnails"></div>;
};

const MediaLinks = ({
  defaultInputs,
}: {
  defaultInputs?: RecordSubmissionType;
}) => {
  return <div className="record-form-media-links"></div>;
};
const MediaDropZones = ({
  defaultInputs,
}: {
  defaultInputs?: RecordSubmissionType;
}) => {
  return (
    <div className="record-form-media-dropzones">
      <FormDropZone
        name={"images"}
        mediaType={"images"}
        description={"Upload Images"}
        maxFiles={10}
        className={"media-form-input"}
        maxSize={Math.pow(10, 6) * 5}
        defaultFiles={defaultInputs?.media?.images}
        includeThumbnails={true}
      />
      <FormDropZone
        name={"videos"}
        defaultFiles={defaultInputs?.media?.videos}
        mediaType={"videos"}
        description={"Upload Videos"}
        maxFiles={10}
        maxSize={Math.pow(10, 8) * 5}
        includeThumbnails={false}
      />
    </div>
  );
};
const RecordFormMediaInput = ({
  defaultInputs,
}: {
  defaultInputs?: RecordSubmissionType;
}) => {
  const [uploadType, setUploadType] = useState<"link" | "file">("link");
  return (
    <>
      <CustomFormInputs
        title="Media"
        name={"mediaFiles"}
        className="record-form-input"
        required={false}
      >
        <>
          <div className="record-form-media-type-btns">
            <button
              type="button"
              className={uploadType === "link" ? "active" : ""}
              aria-label={"set-upload-type-to-links"}
              onClick={() => setUploadType("link")}
            >
              <FontAwesomeIcon icon={faLink} />
              Link
            </button>
            <button
              type="button"
              className={uploadType === "file" ? "active" : ""}
              onClick={() => setUploadType("file")}
              aria-label={"set-upload-type-to-files"}
            >
              <FontAwesomeIcon icon={faImage} /> File
            </button>
          </div>
          {uploadType === "file" && (
            <MediaDropZones defaultInputs={defaultInputs} />
          )}
          {uploadType === "link" && (
            <MediaLinks defaultInputs={defaultInputs} />
          )}
          <MediaThumbnails defaultInputs={defaultInputs} />
        </>
      </CustomFormInputs>
    </>
  );
};
export default RecordFormMediaInput;
