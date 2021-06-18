import { InferActionsType } from "src/main/bll/store";

export enum RecoveryPassActionType {
  SET_LOADING = 'CARDS/RECOVERY_PASS/SET_LOADING',
  SET_SUCCESS = 'CARDS/RECOVERY_PASS/SET_SUCCESS',
  SET_ERROR = 'CARDS/RECOVERY_PASS/SET_ERROR',
}

export const recoveryPassActions = {
  setLoading: (loading: boolean) =>
    ({
      type: RecoveryPassActionType.SET_LOADING,
      payload: {
        loading,
      },
    } as const),
  setSuccess: (success: boolean) =>
    ({
      type: RecoveryPassActionType.SET_SUCCESS,
      payload: {
        success,
      },
    } as const),
  setError: (error: string) =>
    ({
      type: RecoveryPassActionType.SET_ERROR,
      payload: {
        error,
      },
    } as const),
};

export type RecoveryPassActionsType = InferActionsType<
  typeof recoveryPassActions
>;
