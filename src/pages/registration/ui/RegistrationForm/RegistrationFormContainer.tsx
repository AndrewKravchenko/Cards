import React, { FC } from 'react';

import {
  capitalizeFirstLetter,
  transformLinkToTitle,
} from '../../../../utils/textTransform';
import { PATH } from '../../../../main/ui/App/Routes';
import { RegistrationForm } from './RegistrationForm';
import { LoginLinkType } from '../../../login/ui/LoginFormContainer/LoginFormContainer';
import { useDispatch, useSelector } from 'react-redux';
import {
  CreateAuthTC,
  setErrorLogin,
} from '../../../login/bll/authReducer';
import { selectLogin } from '../../../login/bll/selectLogin';
import { Redirect } from 'react-router-dom';

export const RegistrationFormContainer: FC = () => {
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
  const createAuth = (email: string, password: string, ) => {
    dispatch(CreateAuthTC(email, password));
  };
  const closeMessage = (error: string) => {
    dispatch(setErrorLogin(error));
  };
  if (success) {
    return <Redirect to={'/PATH'}/>
  }

  return <RegistrationForm
    loginLink={loginLink}
    createAuth={createAuth}
    closeMessage={closeMessage}
    loading={loading}
  />;
};
