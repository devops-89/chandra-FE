let reduxStore: any = null;

export const setReduxStore = (store: any) => {
  reduxStore = store;
};

export const getReduxStore = () => reduxStore;
