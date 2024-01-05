import { create } from "zustand";
import { TreeElement } from "../types/Rectangle";

type ComponentsStore = {
  components: Record<string, TreeElement>;
  setComponents: (components: Record<string, TreeElement>) => void;
  setComponent: (component: TreeElement) => void;
};

const useComponentsStore = create<ComponentsStore>((set, get) => ({
  components: {},
  setComponents: (components) => set({ components }),
  setComponent: (component) =>
    set({ components: { ...get().components, [component.id]: component } }),
}));

export const componentsStoreSelector = {
  byId: (id: string) => (state: ComponentsStore) => state.components[id],
  ids: (state: ComponentsStore) => Object.keys(state.components),
};
export default useComponentsStore;
