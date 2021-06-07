import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ProfilePage } from '../../../pages/profile/ui/ProfilePage';
import { PacksPage } from '../../../pages/packs/ui/PacksPage';
import { TrainPage } from '../../../pages/learn/ui/TrainPage';
import { CardsPage } from '../../../pages/cards/ui/CardsPage';
import { TestPage } from '../../../pages/test/ui/TestPage';
import React from 'react';
import { PATH } from './Routes';

export const NotAuthWithRedirect = () => {
  const userId = useTypedSelector<string>(state => state.login.user._id);
  if (!userId)
    return <Redirect to={PATH.LOGIN} />;
  return <Switch>
    <Route path={PATH.PROFILE} render={() => <ProfilePage />} />
    <Route path={PATH.PACKS} render={() => <PacksPage />} />
    <Route path={PATH.TRAIN + '/:cardsPack_id'}
           render={() => <TrainPage />} />
    <Route path={PATH.CARDS + '/:cardsPack_id'}
           render={() => <CardsPage />} />
    <Route path={PATH.TEST} render={() => <TestPage />} />
    <Redirect from='*' to={PATH.ERROR_404} />
  </Switch>;
};
