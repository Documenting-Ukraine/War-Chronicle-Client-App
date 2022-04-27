import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { debounce } from 'lodash';
export const useBoundingClient = () => {
  const ref = useRef<HTMLDivElement| HTMLParagraphElement>(null);
  const [bbox, setBbox] = useState<DOMRect| null>(null);

  const set = () =>
    setBbox(ref && ref.current ? ref.current.getBoundingClientRect() : null);

  useEffect(() => {
    let isMount = true;
    const debouncedHandleResize = debounce(set, 50);
    const cleanup = () => {
      window.removeEventListener("resize", debouncedHandleResize);
      isMount = false;
    };
    window.addEventListener("resize", debouncedHandleResize);
    return () => cleanup()
  }, []);

  return {box: bbox, ref: ref, set: set};
};