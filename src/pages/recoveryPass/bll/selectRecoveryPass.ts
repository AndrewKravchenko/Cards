import { RootStateType } from '../../../main/bll/store';

export const selectRecoveryPass = ((state: RootStateType) => state.recoveryPass);
