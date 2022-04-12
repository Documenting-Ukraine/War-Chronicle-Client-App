import getDay from "date-fns/getDay";
import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { unstable_batchedUpdates } from "react-dom";
import useWindowResize from "../../../hooks/use-window-resize";

const GridDay = ({
  dayData,
  activityNum = 1,
}: {
  dayData: Date;
  activityNum: number;
}) => {
  const [offset, setOffset] = useState({ top: 0, left: 0 });
  const [isOver, setIsOver] = useState(false);
  const ref = useRef<SVGRectElement>(null);
  const currDay = getDay(dayData);
  const windowWidth = useWindowResize()
  //this is both to measure the offset, but also to
  //ensure the ref is attacted
  useEffect(() => {
    setOffset({ left: window.pageXOffset, top: window.pageYOffset });
    return () => {
    };
  }, []);
  
  //adjust when the window is resizing so there is no overflow
  useEffect(() => {
    if(windowWidth !== offset.left) setOffset({ left: window.pageXOffset, top: window.pageYOffset });
    return () => {};
  }, [windowWidth, offset.left]);
  const onHover = () => {
    unstable_batchedUpdates(() => {
      //we want the most recent position
      setOffset({ left: window.pageXOffset, top: window.pageYOffset });
      setIsOver(true);
    });
  };
  const rectBoundingRect = ref.current?.getBoundingClientRect();
  const top = `calc(${rectBoundingRect ? rectBoundingRect.y : 0}px + ${
    offset.top
  }px + 1rem)`;
  const left = `calc(${rectBoundingRect ? rectBoundingRect.x : 0}px + ${
    offset.left
    }px  - 5.3rem)`;
  const appRoot = document.body.querySelector("#root")
  return (
    <>
      <rect
        ref={ref}
        className="grid-day"
        onMouseEnter={onHover}
        onMouseLeave={() => setIsOver(false)}
        onTouchStart={onHover}
        onTouchEnd={() => setIsOver(false)}
        onTouchCancel={() => setIsOver(false)}
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
      {createPortal(
        <div
          style={{
            position: "absolute",
            top: top,
            left: left,
          }}
          className={`dashboard-day-activity-details ${isOver ? "show" : ""}`}
        >
          {activityNum} submissions on{" "}
          {dayData.toLocaleDateString("en-us", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </div>,
         appRoot ? appRoot : document.body 
      )}
    </>
  );
};
export default GridDay;
