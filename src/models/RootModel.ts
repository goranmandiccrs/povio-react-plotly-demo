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
  selectedOption: {
    title: {
      text: "First chart",
    },
    series: [
      {
        type: "line",
        data: [1, 2, 3],
      },
    ],
    tooltip: {
      borderColor: "red",
      className: "customClassName",
    },
  },
  dropdownOptions: [
    { value: "firstOption", label: "First plot" },
    { value: "secondOption", label: "Second plot" },
  ],
  "firstOption": {
    title: {
      text: "First chart",
    },
    series: [
      {
        type: "line",
        data: [1, 2, 3],
      },
    ],
    tooltip: {
      borderColor: "red",
      className: "customClassName",
    },
  },
  "secondOption": {
    title: {
      text: "Second chart",
    },
    series: [
      {
        type: "line",
        data: [3, 43, 10],
      },
    ],
    tooltip: {
      borderColor: "green",
      className: "customClassName2",
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
