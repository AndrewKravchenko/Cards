import { RootStateType } from '../../../main/bll/store';

export const selectLogin = ((state: RootStateType) => state.login);
