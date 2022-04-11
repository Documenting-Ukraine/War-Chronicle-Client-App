import { useState, useEffect } from "react";
import debounce from "lodash/debounce";
const useWindowResize = () => {
  const [windowWidth, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    let isMount = true;
    const resize = () => {
      if (isMount) {
        if (windowWidth !== window.innerWidth)
          setWidth(window.innerWidth);
      }
    };
    const debouncedHandleResize = debounce(resize, 50);
    const cleanup = () => {
      window.removeEventListener("resize", debouncedHandleResize);
      isMount = false;
    };
    window.addEventListener("resize", debouncedHandleResize);

    // Remove event listener on cleanup
    return () => cleanup();
  }, [windowWidth]);
  return windowWidth;
};
export default useWindowResize;
