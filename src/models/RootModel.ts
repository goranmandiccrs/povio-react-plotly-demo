import { Instance, types } from "mobx-state-tree";
import { createContext, useContext } from "react";
import { observable } from "mobx";
import { RouterModel, startRouter } from "./RouterModel";
import PageRoutes from "../utils/PageRoutes";

export const RootModel = types
  .model("Root", {
    router: RouterModel,
  })
  .actions((self) => {
    return {
      resetApi() {
        // @ts-ignore
        self.api.init(baseUrl);
      },
    };
  });

export const mobxStore = observable({
  name: "mobx",
  chosenObject: "firstObject",
  tooltipX: 0,
  tooltipY: 0,
  tooltipVisible: false,
  hoverData: {
    xvals: 0,
    yvals: 0,
  },
  firstObject: [
    {
      x: [1, 2, 3],
      y: [2, 5, 3],
      type: "scatter",
      mode: "lines+markers",
      marker: { color: "red" },
    },
    { type: "bar", x: [1, 2, 3], y: [2, 5, 3] },
  ],
  secondObject: [
    {
      x: [3, 5, 6],
      y: [2, 6, 3],
      type: "scatter",
      mode: "lines+markers",
      marker: { color: "red" },
    },
    { type: "bar", x: [3, 5, 6], y: [2, 5, 3] },
  ],
});
if (process.env.NODE_ENV === "development") {
  window["state"] = mobxStore;
}

export type MobxStoreInstance = typeof mobxStore;
export type RootInstance = Instance<typeof RootModel>;
const RootStoreContext = createContext<null | RootInstance>(null);
const MobxStoreContext = createContext<null | MobxStoreInstance>(null);
export const MobxProvider = MobxStoreContext.Provider;
export const Provider = RootStoreContext.Provider;
export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store as RootInstance;
}
export function useMobx() {
  const store = useContext(MobxStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store as MobxStoreInstance;
}

export const rootInstance = RootModel.create({
  router: {
    views: PageRoutes,
  },
});
startRouter(rootInstance.router);
export interface RootType extends Instance<typeof rootInstance> {}
