import { RootStateType } from 'src/main/bll/store';

export const selectPacks = ((state: RootStateType) => state.packs);
