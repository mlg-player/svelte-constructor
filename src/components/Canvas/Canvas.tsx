import { memo, useEffect, useRef, useState } from "react";

import css from "./Canvas.module.css";
import { useSelection } from "../../hooks/drawingRectangle";
import { Rectangle } from "../../types/Rectangle";

const CanvasComponent = () => {
  const [components, setComponents] = useState<Rectangle[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { subscribe } = useSelection((x, y, w, h) => {
    console.log("selection", x, y, w, h);
    setComponents((prev) => [
      ...prev,
      {
        x,
        y,
        width: w,
        height: h,
        id: Math.random().toString(),
      },
    ]);
  });
  useEffect(() => subscribe(wrapperRef.current!), [subscribe]);

  useEffect(() => {
    const element = wrapperRef.current!;
    const listener = () => {
      element.style.width = window.innerWidth + "px";
      element.style.height = window.innerHeight + "px";
      element.style.maxWidth = window.innerWidth + "px";
      element.style.maxHeight = window.innerHeight + "px";
      element.style.overflow = "hidden";
    };
    listener();
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, []);

  return (
    <div ref={wrapperRef} className={css.canvasWrapper}>
      {components.map(({ x, y, width, height, id }) => (
        <div
          key={id}
          className={css.rectangle}
          style={{
            position: "absolute",
            left: x + "px",
            top: y + "px",
            width: width + "px",
            height: height + "px",
            backgroundColor: "rgba(250, 250, 0, 0.2)",
          }}
        />
      ))}
      <canvas id="canvas" className={css.canvas}></canvas>
    </div>
  );
};

const Canvas = memo(CanvasComponent);

export default Canvas;
