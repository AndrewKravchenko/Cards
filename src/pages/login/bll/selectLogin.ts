import { RootStateType } from 'src/main/bll/store';

export const selectLogin = ((state: RootStateType) => state.login);
