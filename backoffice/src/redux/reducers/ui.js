import { types } from '../types/ui';

const initialState = {
  asidemenu: false,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.toggleAsideMenu:
      return {
        ...state,
        asidemenu: action.payload,
      };

    default:
      return state;
  }
};
