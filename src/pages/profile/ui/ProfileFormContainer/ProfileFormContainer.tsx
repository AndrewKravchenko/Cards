import React, { FC } from 'react';
import { ProfileForm } from './ProfileForm';
import { useDispatch, useSelector } from 'react-redux';
import { changeAuthTC, logoutTC } from '../../../login/bll/authReducer';
import { selectLogin } from '../../../login/bll/selectLogin';

export const ProfileFormContainer: FC = () => {
  const dispatch = useDispatch();

  const {
    error,
    loading,
    user
  } = useSelector(selectLogin)

  const changeAuth = (name: string, avatar: string) => {
    dispatch(changeAuthTC(name, avatar));
  };
  const sendLogOut = () => {
    dispatch(logoutTC());
  };

  return <ProfileForm
    loading={loading}
    sendLogOut={sendLogOut}
    changeAuth={changeAuth}
    error={error}
    user={user}
  />;
};
