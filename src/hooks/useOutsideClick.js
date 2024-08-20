import { useEffect, useRef } from "react";

export function useOutsideClick(funcHandler, listenCapturing) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        console.log(ref, e.target);
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
