import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
const namespace = "dashboard-all-contributions";
const slidingWindowAlgo = ({
  currNum,
  interval,
  //paginationEnd,
  maxNumRecorded,
}: {
  currNum: number;
  interval: number;
  //paginationEnd: boolean;
  maxNumRecorded: number;
}) => {
  //we need to include the current num
  const newInterval = interval - 1;
  let lowNum, highNum: number;
  if (currNum - Math.floor(newInterval / 2) >= 0)
    lowNum = currNum - Math.floor(newInterval / 2);
  else lowNum = 0;
  if (currNum + Math.floor(newInterval / 2) <= maxNumRecorded)
    highNum = currNum + Math.floor(newInterval / 2);
  else highNum = currNum;
  return { lowNum, highNum };
};
const PaginationBtns = ({
  currPageNum,
  paginationEnd,
  callback,
}: {
  paginationEnd: boolean;
  currPageNum: number;
  callback?: (e?: { clickedNum: number; currPageNum: number }) => any;
}): JSX.Element => {
  const [maxNum, setMaxNum] = useState(currPageNum);
  useEffect(() => {
    //will not loop because max num will always be greater
    if (currPageNum > maxNum) setMaxNum(currPageNum);
  }, [currPageNum, maxNum]);
  const { lowNum, highNum } = slidingWindowAlgo({
    currNum: currPageNum,
    interval: 7,
    maxNumRecorded: maxNum,
    //paginationEnd: paginationEnd,
  });
  const arr = Array(highNum - lowNum + 1).fill(0);

  const arrBtns = arr.map((el, idx) => (
    <button
      key={idx}
      onClick={(e) => {
        if (callback)
          callback({ clickedNum: lowNum + idx, currPageNum: currPageNum });
      }}
      className={`${namespace}-pagination-btns${
        currPageNum === lowNum + idx ? " active" : ""
      }`}
    >
      {lowNum + idx + 1}
    </button>
  ));
  return (
    <div className={`${namespace}-pagiation-btn-container`}>
      {maxNum > 0 && (
        <button
          className={`${namespace}-prev-btn`}
          onClick={(e) => {
            if (callback)
              callback({
                clickedNum: currPageNum - 1,
                currPageNum: currPageNum,
              });
          }}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
          Prev
        </button>
      )}
      {arrBtns}
      {((paginationEnd && currPageNum < maxNum) || !paginationEnd) && (
        <button
          className={`${namespace}-next-btn`}
          onClick={(e) => {
            if (callback)
              callback({
                clickedNum: currPageNum + 1,
                currPageNum: currPageNum,
              });
          }}
        >
          Next
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      )}
    </div>
  );
};
export default PaginationBtns;
