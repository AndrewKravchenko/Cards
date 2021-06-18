import { RootStateType } from "src/main/bll/store";

export const selectRecoveryPass = ((state: RootStateType) => state.recoveryPass);
