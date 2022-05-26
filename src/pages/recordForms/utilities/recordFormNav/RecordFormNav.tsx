import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import recordFormRoutes, {
  grabRecordFormType,
} from "../../data/recordFormRoutes";
import { Link } from "react-router-dom";
import { useLocation,  } from "react-router";

const RecordFormNav = () => {
  const location = useLocation();
  const endPath = location.pathname.split("/")
  const routeId = endPath[endPath.length-1]
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      navigation
      spaceBetween={40}
      slidesPerView={"auto"}
      className={"record-form-carousel"}
    >
      {recordFormRoutes.map((route) => {
        const formType = grabRecordFormType(route);
        return (
          <SwiperSlide key={formType} style={{ width: "auto" }}>
            <Link
              to={`./${route}`}
              className={`record-form-nav-link ${
                route === routeId ? "selected" : ""
              }`}
            >
              {formType}
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
export default RecordFormNav;
