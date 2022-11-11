import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { has } from "lodash";
export type MediaLink = {
  id: string;
  url: string;
  description?: string;
  mediaType: "image" | "video";
};
export type MediaFileProps = { readonly name: string; preview: string, id: string };
export function isMediaLink(e: any): e is MediaLink {
  try {
    return has(e, "url") && has(e, "mediaType");
  } catch (err) {
    return false;
  }
}
export function isMediaFile(e: any): e is MediaFile {
  try {
    return has(e, "name") && has(e, "preview");
  } catch (err) {
    return false;
  }
}
export const generateFileMap = (files: (MediaFileProps | MediaLink)[]) => {
  const map: { [key: string]: MediaFileProps | MediaLink } = {};
  for (let file of files) {
    if (!isMediaLink(file)) map[file.name] = file;
    else map[file.url] = file;
  }
  return map;
};
export interface ThumbnailProps {
  file: (MediaFileProps) | (MediaLink);
  onRemoveThumbnail?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export type MediaFile = MediaFileProps & File;

export const ThumbnailWrapper = ({
  children,
  file,
  onRemoveThumbnail,
}: {
  children: JSX.Element;
} & ThumbnailProps): JSX.Element => {
  return (
    <>
      <button
        data-file-id={file.id}
        className="remove-thumbnail-btn"
        onClick={onRemoveThumbnail}
        aria-label="remove-file"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <div className="form-thumbnail-inner">{children}</div>
    </>
  );
};
export const ImageThumbnail = ({ file, onRemoveThumbnail }: ThumbnailProps) => {
  return (
    <div className="form-img-thumbnail">
      <ThumbnailWrapper file={file} onRemoveThumbnail={onRemoveThumbnail}>
        <img
          src={isMediaLink(file) ? file.url : file.preview}
          alt={""}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(isMediaLink(file) ? file.url : file.preview);
          }}
        />
      </ThumbnailWrapper>
    </div>
  );
};
export const VideoThumbnail = ({ file, onRemoveThumbnail }: ThumbnailProps) => {
  return (
    <div className="form-video-thumbnail">
      <ThumbnailWrapper file={file} onRemoveThumbnail={onRemoveThumbnail}>
        <video>
          <source
            onLoad={() => {
              URL.revokeObjectURL(isMediaLink(file) ? file.url : file.preview);
            }}
            src={isMediaLink(file) ? file.url : file.preview}
          />
        </video>
      </ThumbnailWrapper>
    </div>
  );
};
