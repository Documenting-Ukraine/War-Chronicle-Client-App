import {
  faLink,
  faImage,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useCallback } from "react";
import { MultiValue } from "react-select";
import { RecordSubmissionType } from "../../../../types";
import {
  isMediaLink,
  MediaLink,
} from "../../../utilityComponents/formInputs/Thumbnails";
import { v4 as uuid } from "uuid";
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
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { useDropZoneProvider } from "../../../utilityComponents/formInputs/FormDropZone/FormDropZoneContext";
import { unstable_batchedUpdates } from "react-dom";
import removeAddedWhiteSpace from "../../../../helperFunctions/removeWhiteSpace";
import {
  ImageThumbnail,
  VideoThumbnail,
} from "../../../utilityComponents/formInputs/Thumbnails";
const MediaTypes = ["Image", "Video"] as const;
const MediaTypesList = [...transformSingleList(MediaTypes)];
function isMediaType(e: any): e is typeof MediaTypes[number] {
  try {
    return MediaTypes.includes(e);
  } catch (err) {
    return false;
  }
}

const MediaWrapper = ({ children }: { children: JSX.Element }) => {
  return <div className="record-form-media-type-wrapper">{children}</div>;
};
const MediaThumbnails = ({
  defaultInputs,
}: {
  defaultInputs?: RecordSubmissionType;
}) => {
  const { newImages, newVideos, storedImages, storedVideos, setNewImages, setNewVideos } =
    useDropZoneProvider();
  const onRemoveThumbnail = (e: React.MouseEvent<HTMLButtonElement>) => {
    //this file id only matches a single url, that has been uploaded
    const fileId = e.currentTarget.dataset["fileId"];
    // const images = [newImages, ...storedImages]
    // const videos = [newVideos, ...storedVideos]

  };
  return (
    <div className="record-form-media-thumbnails">
      {newImages.map((file) => {
        if (isMediaLink(file))
          return (
            <ImageThumbnail
              key={file.url}
              file={file}
              onRemoveThumbnail={onRemoveThumbnail}
            />
          );
        else
          return (
            <ImageThumbnail
              key={file.name}
              file={file}
              onRemoveThumbnail={onRemoveThumbnail}
            />
          );
      })}
      {newVideos.map((file) => {
        if (isMediaLink(file))
          return (
            <VideoThumbnail
              key={file.url}
              file={file}
              onRemoveThumbnail={onRemoveThumbnail}
            />
          );
        else
          return (
            <VideoThumbnail
              key={file.name}
              file={file}
              onRemoveThumbnail={onRemoveThumbnail}
            />
          );
      })}
    </div>
  );
};
export type MediaLinkInputProps = {
  url: string;
  mediaType: string;
  description?: string;
  idx: number;
};
const MediaLinkInput = ({
  idx,
  defaultInput,
  callback,
  id,
  deleteMediaLinkInput,
}: {
  idx: number;
  id: string;
  deleteMediaLinkInput: (e: string) => void;
  defaultInput?: {
    mediaType: string;
    url: string;
    description?: string;
  };
  callback?: ({
    url,
    mediaType,
    description,
    idx,
  }: MediaLinkInputProps) => void;
}) => {
  const [mediaType, setMediaType] = useState<"Video" | "Image">(
    defaultInput && isMediaType(defaultInput.mediaType)
      ? defaultInput.mediaType
      : "Image"
  );
  const [url, setURL] = useState(
    defaultInput && defaultInput.url ? defaultInput.url : ""
  );
  const [description, setDescription] = useState(
    defaultInput && defaultInput.description ? defaultInput.description : ""
  );
  //update callback with data
  useEffect(() => {
    if (callback) callback({ url, description, mediaType, idx });
  }, [mediaType, url, description, idx, callback]);
  return (
    <MediaWrapper>
      <>
        <div className="record-form-media-input-remove-btn">
          <h5>Media Link {idx + 1}</h5>
          <button
            aria-label={`delete-link-${idx}`}
            onClick={() => deleteMediaLinkInput(id)}
          >
            Delete <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>

        <FormInputs
          title="Media Type"
          name={"media-type"}
          className={"record-form-input"}
          dropDown={MediaTypesList}
          defaultDropDownValue={transformOptions(
            mediaType[0].toUpperCase() +
              mediaType.substring(1, mediaType.length)
          )}
          customDropdownFunc={(e: Option | MultiValue<Option> | null) => {
            if (isOption(e) && isMediaType(e.value)) setMediaType(e.value);
          }}
          required
        />
        <FormInputs
          title="URL"
          name="media-link-url"
          className="record-form-input"
          defaultValue={url}
          customValidation={(e) => {
            setURL(e);
            return { err: false, message: "" };
          }}
        />
        <FormInputs
          title="Description"
          name="media-link-description"
          className="record-form-input record-form-media-link-input-description"
          textArea={true}
          defaultValue={description}
          customValidation={(e) => {
            setDescription(e);
            return { err: false, message: "" };
          }}
          required={false}
        />
      </>
    </MediaWrapper>
  );
};
const MediaLinks = ({
  defaultInputs,
}: {
  defaultInputs?: RecordSubmissionType;
}) => {
  const { setNewImages, setNewVideos } = useDropZoneProvider();
  const [mediaLinksList, setMediaLinksList] = useState<
    (MediaLink & { id: string })[]
  >([]);
  const updateMediaLink = useCallback(
    () =>
      ({ url, description, mediaType, idx }: MediaLinkInputProps) =>
        setMediaLinksList((e) => {
          const newArr = [...e];
          const newValue: MediaLink & { id: string } = {
            url,
            description,
            mediaType: mediaType === "Image" ? "image" : "video",
            id: uuid(),
          };
          newArr[idx] = newValue;
          return newArr;
        }),
    []
  );
  const deleteMediaLinkInput = (id: string) =>
    setMediaLinksList((e) => e.filter((i) => i.id !== id));
  return (
    <>
      <div className="record-form-media-links">
        {mediaLinksList.map((e, idx) => (
          <MediaLinkInput
            key={e.id}
            idx={idx}
            id={e.id}
            deleteMediaLinkInput={deleteMediaLinkInput}
            defaultInput={{
              ...e,
              mediaType: e.mediaType === "image" ? "Image" : "Video",
            }}
            callback={updateMediaLink}
          />
        ))}
      </div>

      <div className="record-form-media-links-action-btns">
        <button
          type="button"
          aria-label="add-media-link"
          onClick={() =>
            setMediaLinksList((e) => {
              const copy = [...e];
              copy.push({
                id: uuid(),
                url: "",
                description: "",
                mediaType: "image",
              });
              return copy;
            })
          }
        >
          <FontAwesomeIcon icon={faPlus} /> Add Link
        </button>
        <button
          type="button"
          aria-label="save-media-links"
          onClick={() => {
            //validate urls before saving
            if (
              !mediaLinksList.every(
                (e) =>
                  removeAddedWhiteSpace(e.url).length > 0 &&
                  (e.mediaType === "image" || e.mediaType === "video")
              )
            )
              return;
            const videos = mediaLinksList.filter(
              (e) => e.mediaType === "video"
            );
            const images = mediaLinksList.filter(
              (e) => e.mediaType === "image"
            );
            unstable_batchedUpdates(() => {
              setNewVideos((e) => [...e, ...videos]);
              setNewImages((e) => [...e, ...images]);
              setMediaLinksList([]);
            });
          }}
        >
          <FontAwesomeIcon icon={faFloppyDisk} />
          Save
        </button>
      </div>
    </>
  );
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
            includeThumbnails={true}
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
            <MediaWrapper>
              <MediaDropZones defaultInputs={defaultInputs} />
            </MediaWrapper>
          )}
          {uploadType === "link" && (
            <MediaLinks defaultInputs={defaultInputs} />
          )}
          <MediaThumbnails defaultInputs={defaultInputs} />
        </div>
      </CustomFormInputs>
    </>
  );
};
export default RecordFormMediaInput;
