import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { ProfilePage } from '../../../pages/profile/ui/ProfilePage';
import { LoginPage } from '../../../pages/login/ui/LoginPage';
import { RegistrationPage } from '../../../pages/registration/ui/RegistrationPage';
import { RecoveryPassPage } from '../../../pages/recoveryPass/ui/RecoveryPassPage';
import { SetPassPage } from '../../../pages/setPass/ui/SetPassPage';
import { TestPage } from '../../../pages/test/ui/TestPage';
import { Error404Page } from '../../../pages/error404/ui/Error404Page';
import { PacksPage } from '../../../pages/packs/ui/PacksPage';
import { CardsPage } from '../../../pages/cards/ui/CardsPage';

export const PATH = {
  LOGIN: '/login',
  REGISTRATION: '/registration',
  RECOVERY_PASS: '/recovery-pass',
  SET_PASS: '/set-pass',
  PROFILE: '/profile',
  PACKS: '/packs',
  CARDS: '/cards',
  TEST: '/test',
  ERROR_404: '/error404',
};

export const Routes: FC = () => {
  return (
    <>
      <Switch>
        <Route path="/" exact render={() => <Redirect to={PATH.PROFILE} />} />

        <Route path={PATH.PROFILE} render={() => <ProfilePage />} />
        <Route path={PATH.PACKS} render={() => <PacksPage />} />
        <Route path={PATH.CARDS+'/:cardsPack_id?'} render={() => <CardsPage />} />
        <Route path={PATH.LOGIN} render={() => <LoginPage />} />
        <Route path={PATH.REGISTRATION} render={() => <RegistrationPage />} />
        <Route path={PATH.RECOVERY_PASS} render={() => <RecoveryPassPage />} />
        <Route path={PATH.SET_PASS} render={() => <SetPassPage />} />
        <Route path={PATH.TEST} render={() => <TestPage />} />
        <Route path={PATH.ERROR_404} render={() => <Error404Page />} />

        <Redirect from="*" to={PATH.ERROR_404} />
      </Switch>
    </>
  );
};
