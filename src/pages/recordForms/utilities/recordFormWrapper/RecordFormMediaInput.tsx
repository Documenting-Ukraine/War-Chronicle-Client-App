import {
  faLink,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
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
import { useDropZoneProvider } from "../../../utilityComponents/formInputs/FormDropZone/FormDropZoneContext";
import MediaThumbnails from "./RecordFormMediaThumbnails";
import ConditionalWrapper from "../../../utilityComponents/conditionalWrapper/ConditionalWrapper";
import MediaLinks from "./RecordFormMediaLink";
const MediaTypes = ["Image", "Video"] as const;
const MediaTypesList = [...transformSingleList(MediaTypes)];
function isMediaType(e: any): e is typeof MediaTypes[number] {
  try {
    return MediaTypes.includes(e);
  } catch (err) {
    return false;
  }
}
export const MediaWrapper = ({ children }: { children: JSX.Element }) => {
  return <div className="record-form-media-type-wrapper">{children}</div>;
};

const MediaDropZones = ({
  defaultInputs,
}: {
  defaultInputs?: RecordSubmissionType;
}) => {
  const [mediaType, setMediaType] = useState<"Video" | "Image">("Image");
  return (
    <>
      <FormInputs
        title="Media Type"
        name={"media-type"}
        className={"record-form-input"}
        dropDown={MediaTypesList}
        defaultDropDownValue={transformOptions(
          mediaType[0].toUpperCase() + mediaType.substring(1, mediaType.length)
        )}
        customDropdownFunc={(e: Option | MultiValue<Option> | null) => {
          if (isOption(e) && isMediaType(e.value)) setMediaType(e.value);
        }}
        required
      />
      <div className="record-form-media-dropzones">
        {mediaType === "Image" && (
          <FormDropZone
            name={"images"}
            mediaType={"images"}
            description={"Upload Images"}
            maxFiles={10}
            className={"media-form-input"}
            maxSize={Math.pow(10, 6) * 5}
            defaultFiles={defaultInputs?.media?.images}
            includeThumbnails={false}
          />
        )}
        {mediaType === "Video" && (
          <FormDropZone
            name={"videos"}
            defaultFiles={defaultInputs?.media?.videos}
            className={"media-form-input"}
            mediaType={"videos"}
            description={"Upload Videos"}
            maxFiles={10}
            maxSize={Math.pow(10, 8) * 5}
            includeThumbnails={false}
          />
        )}
      </div>
    </>
  );
};
const RecordFormMediaInput = ({
  defaultInputs,
}: {
  defaultInputs?: RecordSubmissionType;
}) => {
  const [uploadType, setUploadType] = useState<"link" | "file">("link");
  const { newImages, newVideos, storedImages, storedVideos } =
    useDropZoneProvider();
  return (
    <>
      <CustomFormInputs
        title="Media"
        name={"mediaFiles"}
        className="record-form-input"
        required={false}
      >
        <div className="record-form-media-container">
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
            <ConditionalWrapper
              condition={
                newImages.length > 0 ||
                newVideos.length > 0 ||
                storedImages.length > 0 ||
                storedVideos.length > 0
              }
              wrapper={(children) => (
                <div className="record-form-media-files">{children}</div>
              )}
            >
              <MediaWrapper>
                <MediaDropZones defaultInputs={defaultInputs} />
              </MediaWrapper>
            </ConditionalWrapper>
          )}
          {uploadType === "link" && (
            <ConditionalWrapper
              condition={
                newImages.length > 0 ||
                newVideos.length > 0 ||
                storedImages.length > 0 ||
                storedVideos.length > 0
              }
              wrapper={(children) => (
                <div className="record-form-media-files">{children}</div>
              )}
            >
              <MediaLinks />
            </ConditionalWrapper>
          )}
          <MediaThumbnails />
        </div>
      </CustomFormInputs>
    </>
  );
};
export default RecordFormMediaInput;
