import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  capitalizeFirstLetter,
  transformLinkToTitle,
} from '../../../../utils/textTransform';
import { PATH } from '../../../../main/ui/App/Routes';
import { RecoveryPassForm } from './RecoveryPassForm';
import { sendEmailAsync } from '../../bll/recoveryPassThunk';
import { recoveryPassActions } from '../../bll/recoveryPassActions';
import { LoginLinkType } from '../../../login/ui/LoginFormContainer/LoginFormContainer';
import { selectRecoveryPass } from '../../bll/selectRecoveryPass';

export const RecoveryPassFormContainer: FC = () => {
  const { LOGIN, SET_PASS } = PATH;

  const loginLink: LoginLinkType = {
    link: LOGIN,
    title: capitalizeFirstLetter(transformLinkToTitle(LOGIN)),
  };

  const dispatch = useDispatch();

  const {loading, success, error} = useSelector(selectRecoveryPass)

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
