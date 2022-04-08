import getDay from "date-fns/getDay";
import { useRef } from "react";
import { createPortal } from 'react-dom'
const GridDay = ({
  dayData,
  activityNum = 1,
}: {
  dayData: Date;
  activityNum: number;
  }) => {
  const ref = useRef(null)
  const currDay = getDay(dayData);
  return (
    <>
      <rect
        ref={ref}
        className="grid-day"
        width="85"
        height="85"
        rx="19"
        y={currDay * 105}
        fill={
          activityNum <= 0
            ? `rgba(233, 233, 233, 0.7)`
            : `rgba(0, 69, 166, ${activityNum * 0.1})`
        }
      />
      
    </>
  );
};
export default GridDay;
