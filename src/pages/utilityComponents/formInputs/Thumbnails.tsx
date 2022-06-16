import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const generateFileMap = (files: MediaFileProps[]) => {
  const map: { [key: string]: MediaFileProps } = {};
  for (let file of files) map[file.name] = file;
  return map;
};
export type MediaFileProps = { readonly name: string; preview: string };
export interface ThumbnailProps {
  file: MediaFileProps;
  onRemoveThumbnail: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export type MediaFile = MediaFileProps & File
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
        data-file-name={file.name}
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
          src={file.preview}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
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
              URL.revokeObjectURL(file.preview);
            }}
            src={file.preview}
          />
        </video>
      </ThumbnailWrapper>
    </div>
  );
};
