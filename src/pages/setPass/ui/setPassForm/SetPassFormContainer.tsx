import React, { FC } from 'react';

import {
  capitalizeFirstLetter,
  transformLinkToTitle,
} from '../../../../utils/textTransform';
import { PATH } from '../../../../main/ui/App/Routes';
import { SetPassForm } from './SetPassForm';
import { LoginLinkType } from '../../../login/ui/LoginFormContainer/LoginFormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { setErrorLogin, setNewPassTC } from '../../../login/bll/authReducer';
import { selectLogin } from '../../../login/bll/selectLogin';
import { Redirect, useParams } from 'react-router-dom';

export const SetPassFormContainer: FC = () => {
  const { token } = useParams<{ token: string }>();

  const dispatch = useDispatch();

  const { LOGIN } = PATH;
  const {
    success,
    loading,
  } = useSelector(selectLogin)
  const loginLink: LoginLinkType = {
    link: LOGIN,
    title: capitalizeFirstLetter(transformLinkToTitle(LOGIN)),
  };
  const setNewPassAuth = (password: string) => {
    dispatch(setNewPassTC(password, token));
  };
  const closeMessage = (error: string) => {
    dispatch(setErrorLogin(error));
  };
  if (success) {
    return <Redirect to={'/PATH'}/>
  }

  return <SetPassForm
    loginLink={loginLink}
    setNewPassAuth={setNewPassAuth}
    closeMessage={closeMessage}
    loading={loading}
  />;
};
