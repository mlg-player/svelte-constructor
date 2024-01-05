import { useEffect, useRef } from "react";
import Rectangle from "../components/Rectangle/Rectangle";
import useComponentsStore, {
  componentsStoreSelector,
} from "../hooks/compontsStore";
import { useSelection } from "../hooks/drawingRectangle";
import css from "./Canvas.module.css";

const Canvas = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const setComponent = useComponentsStore((store) => store.setComponent);
  const { subscribe } = useSelection((x, y, w, h) => {
    const id = crypto.randomUUID();
    setComponent({
      left: x,
      top: y,
      width: w,
      height: h,
      type: "rectangle",
      id: id,
    });
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
  const ids = useComponentsStore(componentsStoreSelector.ids);
  return (
    <div ref={wrapperRef} className={css.canvasWrapper}>
      {ids.map((id) => (
        <CanvasItem id={id} key={id} />
      ))}
    </div>
  );
};

const CanvasItem: React.FC<{ id: string }> = ({ id }) => {
  const component = useComponentsStore(componentsStoreSelector.byId(id));
  console.log(component)

  switch (component.type) {
    case "rectangle":
      return <Rectangle {...component} />;

    default:
      return null;
  }
};

export default Canvas;
