import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { RecordSubmissionType } from "../../types";
const RecordContentCarousel = ({
  media,
  namespace,
}: {
  namespace: string;
  media: RecordSubmissionType["media"];
}) => {
  if (!media) return <></>;
  const images = media.images;
  const videos = media.videos;
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      navigation
      spaceBetween={40}
      slidesPerView={"auto"}
      className={`${namespace}-content-carousel`}
    >
      {images &&
        images.map((m) => (
          <SwiperSlide className={`${namespace}-caro-media-item`}>
            <img src={m} />
          </SwiperSlide>
        ))}
      {videos &&
        videos.map((m) => (
          <SwiperSlide className={`${namespace}-caro-media-item`}>
            <video>
              <source src={m} />
            </video>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};
export default RecordContentCarousel;
