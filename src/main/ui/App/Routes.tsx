import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { LoginPage } from '../../../pages/login/ui/LoginPage';
import { RecoveryPassPage } from '../../../pages/recoveryPass/ui/RecoveryPassPage';
import { SetPassPage } from '../../../pages/setPass/ui/SetPassPage';
import { Error404Page } from '../../../pages/error404/ui/Error404Page';
import { NotAuthWithRedirect } from './NotAuthWithRedirect';
import { RegistrationPage } from '../../../pages';

export const PATH = {
  LOGIN: '/login',
  REGISTRATION: '/registration',
  RECOVERY_PASS: '/recovery-pass',
  SET_PASS: '/set-pass',
  PROFILE: '/profile',
  PACKS: '/packs',
  TRAIN: '/train',
  CARDS: '/cards',
  TEST: '/test',
  ERROR_404: '/error404',
};

export const Routes: FC = () => {
  return (
    <>
      <Switch>
        <Route path='/' exact render={() => <Redirect to={PATH.PROFILE} />} />
        <Route path={PATH.LOGIN} render={() => <LoginPage />} />
        <Route path={PATH.REGISTRATION} render={() => <RegistrationPage />} />
        <Route path={PATH.RECOVERY_PASS} render={() => <RecoveryPassPage />} />
        <Route path={PATH.SET_PASS + '/:token'} render={() => <SetPassPage />} />
        <Route path={PATH.ERROR_404} render={() => <Error404Page />} />
        <NotAuthWithRedirect/>
      </Switch>
    </>
  );
};
