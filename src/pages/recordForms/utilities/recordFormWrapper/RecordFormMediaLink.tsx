import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useEffect,
  useState,
  useCallback,
  createContext,
  useContext,
} from "react";
import { MultiValue } from "react-select";
import { MediaLink } from "../../../utilityComponents/formInputs/Thumbnails";
import { v4 as uuid } from "uuid";
import {
  isOption,
  Option,
  transformOptions,
  transformSingleList,
} from "../../../authPage/data/OccupationList";
import FormInputs from "../../../utilityComponents/formInputs/FormInputs";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { useDropZoneProvider } from "../../../utilityComponents/formInputs/FormDropZone/FormDropZoneContext";
import { unstable_batchedUpdates } from "react-dom";
import removeAddedWhiteSpace from "../../../../helperFunctions/removeWhiteSpace";
import { MediaWrapper } from "./RecordFormMediaInput";
const MediaTypes = ["Image", "Video"] as const;
const MediaTypesList = [...transformSingleList(MediaTypes)];
function isMediaType(e: any): e is typeof MediaTypes[number] {
  try {
    return MediaTypes.includes(e);
  } catch (err) {
    return false;
  }
}
export type MediaLinkInputCallback = {
  url: string;
  mediaType: string;
  description?: string;
  idx: number;
};
type MediaLinkInputProps = {
  idx: number;
  id: string;
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
  }: MediaLinkInputCallback) => void;
};
const MediaLinksContext = createContext<{
  mediaLinksList: MediaLink[];
  setMediaLinksList: React.Dispatch<React.SetStateAction<MediaLink[]>>;
  updateMediaLink: (e: MediaLinkInputCallback) => void;
  deleteMediaLinkInput: (e: string) => void;
} | null>(null);
export const useMediaLinksProvider = () => {
  const context = useContext(MediaLinksContext);
  if (!context)
    throw new Error(
      "You must call use Media Links Provider insides a MediaLinksProvider"
    );
  return context;
};
export const MediaLinksProvider = ({ children }: { children: JSX.Element }) => {
  const [mediaLinksList, setMediaLinksList] = useState<MediaLink[]>([]);
  const updateMediaLink = useCallback(
    ({ url, description, mediaType, idx }: MediaLinkInputCallback) =>
      setMediaLinksList((e) => {
        const newArr = e;
        const newValue: MediaLink = {
          url,
          description,
          mediaType: mediaType === "Image" ? "image" : "video",
          id: newArr[idx].id,
        };
        newArr[idx] = newValue;
        return newArr;
      }),
    []
  );
  const deleteMediaLinkInput = (id: string) => {
    setMediaLinksList((e) => {
      const newArr = [...e];
      let idx: number | null = null;
      for (let i in newArr) {
        if (newArr[i].id !== id) continue;
        idx = parseInt(i);
        break;
      }
      if (idx === null) return e;
      newArr.splice(idx, 1);
      return newArr;
    });
  };

  const wrapped = {
    mediaLinksList,
    setMediaLinksList,
    deleteMediaLinkInput,
    updateMediaLink,
  };
  return (
    <MediaLinksContext.Provider value={wrapped}>
      {children}
    </MediaLinksContext.Provider>
  );
};
export const MediaLinkInput = ({
  idx,
  defaultInput,
  id,
}: MediaLinkInputProps) => {
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
  const { deleteMediaLinkInput, updateMediaLink } = useMediaLinksProvider();
  //update callback with data
  useEffect(() => {
    console.log(mediaType, url, description, idx);
    updateMediaLink({ url, description, mediaType, idx });
    //eslint-disable-next-line
  }, [mediaType, url, description, idx]);
  return (
    <MediaWrapper>
      <>
        <div className="record-form-media-input-remove-btn">
          <h5>Media Link {idx + 1}</h5>
          <button
            type="button"
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

const MediaLinksList = () => {
  const { setNewImages, setNewVideos } = useDropZoneProvider();
  const { mediaLinksList, setMediaLinksList } = useMediaLinksProvider();
  return (
    <>
      <div className="record-form-media-links">
        {mediaLinksList.map((e, idx) => (
          <MediaLinkInput key={e.id} idx={idx} id={e.id} />
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
            if (
              mediaLinksList.every(
                (e) =>
                  removeAddedWhiteSpace(e.url).length <= 0 &&
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
const MediaLinks = () => {
  return (
    <MediaLinksProvider>
      <MediaLinksList />
    </MediaLinksProvider>
  );
};
export default MediaLinks;
