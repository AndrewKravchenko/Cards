import { ThunkType } from 'src/main/bll/store';
import {
  recoveryPassActions,
  RecoveryPassActionsType,
} from './recoveryPassActions';
import { recoveryPassApi } from 'src/pages/recoveryPass/dal/recoveryPassApi';

const { setLoading, setSuccess, setError } = recoveryPassActions;

export const sendEmailAsync = (
  email: string,
): ThunkType<RecoveryPassActionsType> => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const { success } = await recoveryPassApi.sendEmail({ email });

    if (success) {
      dispatch(setSuccess(success));
    }
  } catch (e) {
    const error = e.response
      ? e.response.data.error
      : e.message + ', more details in the console';

    dispatch(setError(error));
  }
};
