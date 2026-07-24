import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, AppAction, SceneType } from '../types/app';

const initialState: AppState = {
  currentScene: 'LOADING',
  audioMuted: false,
  audioStarted: false,
  petProgress: 0,
  noDodgeCount: 0,
  catTapCount: 0,
  catMood: 'happy',
  isNightMode: false,
  signatureData: null,
  proposalResult: null,
  easterEggsUnlocked: {
    blushingCat: false,
    shootingStars: false,
    discoCats: false,
    sleepingCat: false,
    secretMeow: false,
  },
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_SCENE':
      return { ...state, currentScene: action.payload };
    case 'TOGGLE_AUDIO':
      return { ...state, audioMuted: !state.audioMuted };
    case 'START_AUDIO':
      return { ...state, audioStarted: true };
    case 'PET_CAT': {
      const nextProgress = Math.min(100, state.petProgress + action.payload);
      const mood = nextProgress >= 100 ? 'excited' : nextProgress > 50 ? 'purring' : 'happy';
      return { ...state, petProgress: nextProgress, catMood: mood };
    }
    case 'INCREMENT_NO_DODGE':
      return { ...state, noDodgeCount: state.noDodgeCount + 1 };
    case 'TAP_CAT': {
      const newTaps = state.catTapCount + 1;
      let newMood = state.catMood;
      let newEasterEggs = { ...state.easterEggsUnlocked };
      if (newTaps >= 10 && !newEasterEggs.blushingCat) {
        newMood = 'blushing';
        newEasterEggs.blushingCat = true;
      }
      return { ...state, catTapCount: newTaps, catMood: newMood, easterEggsUnlocked: newEasterEggs };
    }
    case 'SET_CAT_MOOD':
      return { ...state, catMood: action.payload };
    case 'SET_NIGHT_MODE':
      return { ...state, isNightMode: action.payload };
    case 'SET_SIGNATURE':
      return { ...state, signatureData: action.payload };
    case 'SET_PROPOSAL_RESULT':
      return { ...state, proposalResult: action.payload };
    case 'UNLOCK_EASTER_EGG':
      return {
        ...state,
        easterEggsUnlocked: { ...state.easterEggsUnlocked, [action.payload]: true },
      };
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
