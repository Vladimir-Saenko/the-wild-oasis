import { useEffect, useRef } from "react";

export function useOutsideClick(funcHandler, listenCapturing) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) funcHandler();
      }

      document.addEventListener("click", handleClick, listenCapturing); // listenCapturing - режим обработка события
      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [funcHandler, listenCapturing]
  );
  return ref;
}
