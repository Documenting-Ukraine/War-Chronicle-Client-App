import { RecordSubmissionType } from "../../../types";
import {
  LazyLoadComponent,
  LazyLoadImage,
  ScrollPosition,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import ReactPlayer from "react-player/lazy";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { MediaLink } from "../../../types/dataTypes/GeneralRecordType";
import { useEffect, useState } from "react";
import LoadingIcon from "../../utilityComponents/loadingIcon/LoadingIcon";
const MediaFile = ({
  type,
  link,
  className,
  wrapper,
  scrollPosition,
  controls = false,
  description,
}: {
  scrollPosition?: ScrollPosition;
  type?: "image" | "video";
  link?: string;
  className?: string;
  wrapper?: (e: JSX.Element) => JSX.Element;
  controls?: boolean;
  description?: string;
}) => {
  const [loading, setLoading] = useState(true);
  const loadingIcon = (
    <div className="media-loading-placeholder">
      <LoadingIcon />
    </div>
  );
  const mediaType = (
    <div className="media-file-container">
      {type === "image" ? (
        <>
          {loading && loadingIcon}

          <LazyLoadImage
            src={link}
            alt={description}
            className={className ? className : ""}
            useIntersectionObserver
            beforeLoad={() => {
              setLoading(false);
            }}
          />
        </>
      ) : type === "video" ? (
        <ReactPlayer
          url={link}
          width={"100%"}
          height={"100%"}
          fallback={loadingIcon}
          controls={controls}
          className={className ? className : ""}
          alt={description}
        />
      ) : null}
    </div>
  );

  if (wrapper && mediaType)
    return wrapper(
      <LazyLoadComponent
        placeholder={loadingIcon}
        scrollPosition={scrollPosition}
        useIntersectionObserver
      >
        {mediaType}
      </LazyLoadComponent>
    );
  else
    return (
      <LazyLoadComponent
        placeholder={loadingIcon}
        scrollPosition={scrollPosition}
        useIntersectionObserver
      >
        {mediaType}
      </LazyLoadComponent>
    );
};
const MediaPresentation = ({
  namespace,
  media,
  scrollPosition,
}: {
  namespace: string;
  media?: MediaLink[];
  scrollPosition: ScrollPosition;
}) => {
  const [currMediaIdx, setCurrMediaIdx] = useState(0);
  const currMedia = media && media[currMediaIdx];
  //this is dom manipulation is required
  // here because if not, the media presentation
  // will not be sticky and scroll down with content
  useEffect(() => {
    const rootNode = document.getElementById("root");
    if (rootNode) rootNode.style.overflow = "visible";
    return () => {
      const node = document.getElementById("root");
      if (node) node.style.overflow = "";
    };
  }, []);
  if (!media || media.length < 1) return <></>;
  return (
    <div className={`${namespace}-media-presentation`}>
      <MediaFile
        type={currMedia?.mediaType}
        link={currMedia?.url}
        wrapper={(children: JSX.Element) => (
          <div className="main-media-file">{children}</div>
        )}
        scrollPosition={scrollPosition}
        controls
      />
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        slidesPerView={"auto"}
        className={`${namespace}-media-carousel`}
      >
        {media.map((m, idx) => (
          <SwiperSlide
            onClick={() => setCurrMediaIdx(idx)}
            key={m.id}
            className={`${namespace}-caro-media-item ${
              idx === currMediaIdx ? "active-media" : ""
            }`}
          >
            <MediaFile
              scrollPosition={scrollPosition}
              type={m.mediaType}
              link={m.url}
              description={m.description}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={`${namespace}-media-caption`}>
        {currMediaIdx + 1} of {media.length} media files
      </div>
    </div>
  );
};
const OptimizedMediaPresentation = trackWindowScroll(MediaPresentation);
const RecordPageMedia = ({
  media,
  namespace,
}: {
  namespace: string;
  media: RecordSubmissionType["media"];
}) => {
  if (!media) return <></>;
  //transform data
  const images = media.images;
  const videos = media.videos;
  const typedImages: MediaLink[] = images ? images.map((i) => ({ ...i })) : [];
  const typedVideos: MediaLink[] = videos ? videos.map((v) => ({ ...v })) : [];
  const allMedia = [...typedImages, ...typedVideos];
  return <OptimizedMediaPresentation namespace={namespace} media={allMedia} />;
};
export default RecordPageMedia;
