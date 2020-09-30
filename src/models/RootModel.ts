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
  chosenPlot: "firstPlot",
  firstPlot: {
    data: [
      {
        x: [1, 2, 3, 4],
        y: [1, 3, 2, 6],
        type: "bar",
        marker: { color: "#ab63fa" },
        name: "Bar",
      },
      {
        x: [1, 2, 3, 4],
        y: [3, 2, 7, 4],
        type: "line",
        marker: { color: "#19d3f3" },
        name: "Line",
      },
    ],
    layout: {
      plotBackground: "#f3f6fa",
      margin: { t: 0, r: 0, l: 20, b: 30 },
    },
  },
  secondPlot: {
    data: [
      {
        x: [2, 4, 6, 8],
        y: [2, 5, 7, 10],
        type: "bar",
        marker: { color: "#ab63fa" },
        name: "Bar",
      },
      {
        x: [1, 2, 3, 4],
        y: [3, 2, 7, 4],
        type: "line",
        marker: { color: "#19d3f3" },
        name: "Line",
      },
    ],
    layout: {
      plotBackground: "#f3f6fa",
      margin: { t: 0, r: 0, l: 20, b: 30 },
    },
  },
});

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
