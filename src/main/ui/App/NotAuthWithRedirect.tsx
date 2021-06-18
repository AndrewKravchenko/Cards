import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useTypedSelector } from 'src/hooks';
import { PATH } from 'src/main/ui/App/Routes';
import { TestPage } from 'src/pages/test/ui/TestPage';
import { PacksPage } from 'src/pages/packs/ui/PacksPage';
import { TrainPage } from 'src/pages/learn/ui/TrainPage';
import { CardsPage } from 'src/pages/cards/ui/CardsPage';
import { ProfilePage } from 'src/pages/profile/ui/ProfilePage';

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
