import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import {
  capitalizeFirstLetter,
  transformLinkToTitle,
} from '../../../../utils/textTransform';
import { PATH } from '../../../../main/ui/App/Routes';
import { RecoveryPassForm } from './RecoveryPassForm';
import { sendEmailAsync } from '../../bll/recoveryPassThunk';
import { recoveryPassActions } from '../../bll/recoveryPassActions';
import { LoginLinkType } from '../../../login/ui/LoginFormContainer/LoginFormContainer';

export const RecoveryPassFormContainer: FC = () => {
  const { LOGIN, SET_PASS } = PATH;

  const loginLink: LoginLinkType = {
    link: LOGIN,
    title: capitalizeFirstLetter(transformLinkToTitle(LOGIN)),
  };

  const dispatch = useDispatch();

  const loading = useTypedSelector<boolean>(
    (state) => state.recoveryPass.loading,
  );
  const success = useTypedSelector<boolean>(
    (state) => state.recoveryPass.success,
  );
  const error = useTypedSelector<string>((state) => state.recoveryPass.error);

  const sendEmail = (email: string) => {
    dispatch(sendEmailAsync(email));
  };

  const closeMessage = (error: string) => {
    dispatch(recoveryPassActions.setError(error));
  };

  const setSuccess = (success: boolean) => {
    dispatch(recoveryPassActions.setSuccess(success));
  };

  return (
    <RecoveryPassForm
      loginLink={loginLink}
      sendEmail={sendEmail}
      setSuccess={setSuccess}
      closeMessage={closeMessage}
      loading={loading}
      success={success}
      error={error}
      redirectLink={SET_PASS}
    />
  );
};