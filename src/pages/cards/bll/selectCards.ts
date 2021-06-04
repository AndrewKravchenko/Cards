import { RootStateType } from '../../../main/bll/store';

export const selectCards = ((state: RootStateType) => state.cards);
