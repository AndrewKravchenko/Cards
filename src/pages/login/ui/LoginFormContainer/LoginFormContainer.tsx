import React, { FC } from 'react';
import { LoginForm } from './LoginForm';
import { PATH } from '../../../../main/ui/App/Routes';
import {
  capitalizeFirstLetter,
  transformLinkToTitle,
} from '../../../../utils/textTransform';
import { useDispatch, useSelector } from 'react-redux';
import { loginPageTC, setErrorLogin } from '../../bll/authReducer';
import { selectLogin } from '../../bll/selectLogin';

export const LoginFormContainer: FC = () => {
  const dispatch = useDispatch();

  const { RECOVERY_PASS, REGISTRATION, PROFILE } = PATH;

  const loginLinks: LoginLinkType[] = [
    {
      link: RECOVERY_PASS,
      title: capitalizeFirstLetter(transformLinkToTitle(' Forgot password?')),
    },
    {
      link: REGISTRATION,
      title: capitalizeFirstLetter(transformLinkToTitle(' Registration')),
    },
  ];
  const {
    error,
    loading,
    user
  } = useSelector(selectLogin)
  const userId = user._id;
  const sendLogin = (email: string, password: string, rememberMe: boolean) => {
    dispatch(loginPageTC(email, password, rememberMe));
  };
  const closeMessage = (error: string) => {
    dispatch(setErrorLogin(error));
  };

  return <LoginForm loginLinks={loginLinks}
                    sendLogin={sendLogin}
                    loading={loading}
                    userId={userId}
                    error={error}
                    closeMessage={closeMessage}
                    redirectLink={PROFILE}
  />;
};

export type LoginLinkType = {
  link: string;
  title: string;
};
