import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, AppAction, SceneType } from '../types/app';

const initialState: AppState = {
  currentScene: 'LOADING',
  audioMuted: false,
  audioStarted: false,
  activeSlideIndex: 0,
  noDodgeCount: 0,
  catTapCount: 0,
  catMood: 'happy',
  isNightMode: false,
  isGoldenHour: false,
  signatureData: null,
  proposalResult: null,
  bouquetAccepted: false,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_SCENE':
      return { ...state, currentScene: action.payload };
    case 'TOGGLE_AUDIO':
      return { ...state, audioMuted: !state.audioMuted };
    case 'START_AUDIO':
      return { ...state, audioStarted: true };
    case 'SET_SLIDE_INDEX':
      return { ...state, activeSlideIndex: action.payload };
    case 'INCREMENT_NO_DODGE':
      return { ...state, noDodgeCount: state.noDodgeCount + 1 };
    case 'TAP_CAT':
      return { ...state, catTapCount: state.catTapCount + 1 };
    case 'SET_CAT_MOOD':
      return { ...state, catMood: action.payload };
    case 'SET_NIGHT_MODE':
      return { ...state, isNightMode: action.payload, isGoldenHour: false };
    case 'SET_GOLDEN_HOUR':
      return { ...state, isGoldenHour: action.payload, isNightMode: false };
    case 'ACCEPT_BOUQUET':
      return { ...state, bouquetAccepted: true, catMood: 'embarrassed' };
    case 'SET_SIGNATURE':
      return { ...state, signatureData: action.payload };
    case 'SET_PROPOSAL_RESULT':
      return { ...state, proposalResult: action.payload };
    case 'RESET_APP':
      return { ...initialState, audioStarted: state.audioStarted, audioMuted: state.audioMuted };
    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  goToScene: (scene: SceneType) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const goToScene = (scene: SceneType) => {
    dispatch({ type: 'SET_SCENE', payload: scene });
  };

  return (
    <AppContext.Provider value={{ state, dispatch, goToScene }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
