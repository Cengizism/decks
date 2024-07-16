import { StateType } from './stateType';

export type ActionType = { type: 'SET_THEME'; payload: 'light' | 'dark' };

export const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'SET_THEME':
      return {
        ...state,
        interface: { ...state.interface, theme: action.payload },
      };
    default:
      return state;
  }
};
