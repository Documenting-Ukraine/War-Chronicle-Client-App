import { RecordSubmissionType } from "../../types";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { MediaLink } from "../../types/dataTypes/GeneralRecordType";
import { useState } from "react";
const MediaCarousel = ({
  namespace,
  media,
}: {
  namespace: string;
  media?: { type: "image" | "video"; link: MediaLink }[];
}) => {
  const [currImg, setCurrImg] = useState(0);
  console.log(currImg)
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      navigation
      spaceBetween={40}
      slidesPerView={"auto"}
      className={`${namespace}-content-carousel`}
      onSlideChange={(e) => {
        console.log(e.clickedIndex);
        setCurrImg(e.clickedIndex);
      }}
      slideActiveClass="active-media"
    >
      {media &&
        media.map((m) => (
          <SwiperSlide className={`${namespace}-caro-media-item`}>
            {m.type === "image" ? (
              <img src={m.link} alt=''/>
            ) : (
              <video>
                <source src={m.link} />
              </video>
            )}
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

const RecordMediaCarousel = ({
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
  const typedImages: { type: "image"; link: string }[] = images
    ? images.map((i) => ({ type: "image", link: i }))
    : [];
  const typedVideos: { type: "video"; link: string }[] = videos
    ? videos.map((v) => ({ type: "video", link: v }))
    : [];
  const allMedia = [...typedImages, ...typedVideos];
  return <MediaCarousel namespace={namespace} media={allMedia} />;
};
export default RecordMediaCarousel;
