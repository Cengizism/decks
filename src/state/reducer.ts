import type { StateType, UserType } from '@/interfaces/';

export type ActionType =
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'TOGGLE_NAVIGATION_DRAWER'; payload: boolean }
  | { type: 'SET_NAVIGATION_ITEM'; payload: string }
  | { type: 'SET_USER'; payload: UserType | null };

export const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'SET_THEME':
      return {
        ...state,
        interface: {
          ...state.interface,
          theme: action.payload,
        },
      };
    case 'TOGGLE_NAVIGATION_DRAWER':
      return {
        ...state,
        interface: {
          ...state.interface,
          isNavigationDrawerOpen: action.payload,
        },
      };
    case 'SET_NAVIGATION_ITEM':
      return {
        ...state,
        interface: {
          ...state.interface,
          selectedNavigationItem: action.payload,
        },
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};
