type Mode = "selection" | "creation";

const drawingRectangle = (mode: Mode) => {
  if (mode === "selection") {
    return;
  } else if (mode === "creation") {
    return;
  }
};

export const useSelection = (
  onSelection: (x: number, y: number, width: number, height: number) => void
) => {
  let element: HTMLDivElement | null = null;

  let startX = 0,
    startY = 0;

  return {
    subscribe: (parentRef?: HTMLDivElement) => {
      const mouseDown = (e: MouseEvent) => {
        const { pageX: offsetX, pageY: offsetY } = e;

        if (!element) element = document.createElement("div");
        element.style.position = "absolute";
        element.style.left = offsetX + "px";
        element.style.top = offsetY + "px";
        element.style.width = "0px";
        element.style.height = "0px";
        element.style.border = "1px solid rgba(50, 100, 255, 0.4)";
        element.style.backgroundColor = "rgba(50, 100, 255, 0.1)";
        element.style.zIndex = "1000";
        element.style.pointerEvents = "none";

        startX = offsetX;
        startY = offsetY;

        parentRef?.appendChild(element);
      };
      const mouseMove = (e: MouseEvent) => {
        const { pageX: offsetX, pageY: offsetY } = e;

        if (element) {
          const width = offsetX - startX;
          const height = offsetY - startY;

          let settledWidth = width + "px";
          let settledHeight = height + "px";

          if (width < 0) {
            element.style.left = offsetX + "px";
            settledWidth = `${-width}px`;
          }

          if (width + parseInt(element.style.left) >= window.innerWidth) {
            settledWidth = window.innerWidth + "px";
          }

          if (height < 0) {
            element.style.top = offsetY + "px";
            settledHeight = `${-height}px`;
          }

          if (height + parseInt(element.style.top) >= window.innerHeight) {
            settledHeight = window.innerHeight + "px";
          }

          element.style.width = settledWidth;
          element.style.height = settledHeight;
        }
      };
      const mouseUp = () => {
        if (element) {
          if (onSelection)
            onSelection(
              parseInt(element.style.left),
              parseInt(element.style.top),
              parseInt(element.style.width),
              parseInt(element.style.height)
            );
          parentRef?.removeChild(element);
          element = null;
        }
      };

      parentRef?.addEventListener("mousedown", mouseDown);
      document?.addEventListener("mousemove", mouseMove);
      window?.addEventListener("mouseup", mouseUp);
      return () => {
        parentRef?.removeEventListener("mousedown", mouseDown);
        document?.removeEventListener("mousemove", mouseMove);
        window?.removeEventListener("mouseup", mouseUp);
      };
    },
  };
};

export default drawingRectangle;
