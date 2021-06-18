import { RootStateType } from "src/main/bll/store";

export const selectCards = ((state: RootStateType) => state.cards);
