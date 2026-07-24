export type SceneType =
  | 'LOADING'
  | 'CAT_INTRO'
  | 'FLOWER_GIFT'
  | 'HEART_CONNECTION'
  | 'POEM_ONE'
  | 'PROMISE_SECTION'
  | 'MEMORIES_GALLERY'
  | 'PROPOSAL_QUESTION'
  | 'NO_GRACEFUL'
  | 'YES_CELEBRATION'
  | 'CONTRACT'
  | 'POST_SIGNATURE'
  | 'GRAND_FINALE';

export type CatMood =
  | 'happy'
  | 'nervous'
  | 'shy'
  | 'crying'
  | 'sleeping'
  | 'excited'
  | 'in_love'
  | 'embarrassed'
  | 'celebrating'
  | 'kisses'
  | 'purring'
  | 'waving';

export interface AppState {
  currentScene: SceneType;
  audioMuted: boolean;
  audioStarted: boolean;
  activeSlideIndex: number;
  noDodgeCount: number;
  catTapCount: number;
  catMood: CatMood;
  isNightMode: boolean;
  isGoldenHour: boolean;
  signatureData: string | null;
  proposalResult: 'accepted' | 'declined' | null;
  bouquetAccepted: boolean;
}

export type AppAction =
  | { type: 'SET_SCENE'; payload: SceneType }
  | { type: 'TOGGLE_AUDIO' }
  | { type: 'START_AUDIO' }
  | { type: 'SET_SLIDE_INDEX'; payload: number }
  | { type: 'INCREMENT_NO_DODGE' }
  | { type: 'TAP_CAT' }
  | { type: 'SET_CAT_MOOD'; payload: CatMood }
  | { type: 'SET_NIGHT_MODE'; payload: boolean }
  | { type: 'SET_GOLDEN_HOUR'; payload: boolean }
  | { type: 'ACCEPT_BOUQUET' }
  | { type: 'SET_SIGNATURE'; payload: string }
  | { type: 'SET_PROPOSAL_RESULT'; payload: 'accepted' | 'declined' }
  | { type: 'RESET_APP' };
