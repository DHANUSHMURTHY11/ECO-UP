export type SceneType =
  | 'LOADING'
  | 'CAT_INTRO'
  | 'POEM_ONE'
  | 'PET_GAME'
  | 'SUSPENSE_PROPOSAL'
  | 'PROPOSAL_QUESTION'
  | 'NO_GRACEFUL'
  | 'YES_CELEBRATION'
  | 'DELIVERY_CAR'
  | 'CONTRACT'
  | 'GRAND_FINALE';

export type CatMood = 'happy' | 'purring' | 'blushing' | 'sleeping' | 'waving' | 'excited' | 'shy';

export interface AppState {
  currentScene: SceneType;
  audioMuted: boolean;
  audioStarted: boolean;
  petProgress: number; // 0 to 100
  noDodgeCount: number;
  catTapCount: number;
  catMood: CatMood;
  isNightMode: boolean;
  signatureData: string | null;
  proposalResult: 'accepted' | 'declined' | null;
  easterEggsUnlocked: {
    blushingCat: boolean;
    shootingStars: boolean;
    discoCats: boolean;
    sleepingCat: boolean;
    secretMeow: boolean;
  };
}

export type AppAction =
  | { type: 'SET_SCENE'; payload: SceneType }
  | { type: 'TOGGLE_AUDIO' }
  | { type: 'START_AUDIO' }
  | { type: 'PET_CAT'; payload: number }
  | { type: 'INCREMENT_NO_DODGE' }
  | { type: 'TAP_CAT' }
  | { type: 'SET_CAT_MOOD'; payload: CatMood }
  | { type: 'SET_NIGHT_MODE'; payload: boolean }
  | { type: 'SET_SIGNATURE'; payload: string }
  | { type: 'SET_PROPOSAL_RESULT'; payload: 'accepted' | 'declined' }
  | { type: 'UNLOCK_EASTER_EGG'; payload: keyof AppState['easterEggsUnlocked'] }
  | { type: 'RESET_APP' };
