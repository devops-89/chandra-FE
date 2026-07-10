import type { AnyAction, Store } from '@reduxjs/toolkit';

import type { RootState } from './store';

type AppStore = Store<RootState, AnyAction>;

let appStore: AppStore | undefined;

export const setAppStore = (store: AppStore) => {
  appStore = store;
};

export const getAppStore = (): AppStore => {
  if (!appStore) {
    throw new Error('Redux store has not been initialized yet');
  }

  return appStore;
};
