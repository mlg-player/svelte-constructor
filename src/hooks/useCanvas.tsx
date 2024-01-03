import { useSyncExternalStore } from "react";

export type CanvasStoreValue = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  canvas: {
    width: number;
    height: number;
    context: CanvasRenderingContext2D | null;
  };
};
const canvasStore = {
  value: {
    canvasRef: null as unknown as CanvasStoreValue['canvasRef'] ,
    canvas: {
      width: 0,
      height: 0,
      context: null as CanvasRenderingContext2D | null,
    },
  } as CanvasStoreValue,
  listeners: new Set<() => void>(),

  set: (value: CanvasStoreValue) => {
    canvasStore.value = value;
    canvasStore.listeners.forEach((listener) => listener());
  },

  get: () => canvasStore.value,

  subscribe: (listener: () => void) => {
    canvasStore.listeners.add(listener);
    return () => canvasStore.listeners.delete(listener);
  },
};

const useCanvas = () => {
  return useSyncExternalStore(canvasStore.subscribe, canvasStore.get);
};

export default useCanvas;
