import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import s from './App.module.scss';
import { Header } from './Header';
import { Main } from './Main';
import { isAuthTC } from '../../../pages/login/bll/authReducer';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

export const App: FC = () => {
  const isInitial = useTypedSelector<boolean>(state => state.login.isInitial);
  const dispatch = useDispatch();
  useEffect(() => {
    !isInitial && dispatch(isAuthTC());
  }, []);

  return (
    <div className={s.app}>
      <Header />

      {isInitial && <Main /> }
    </div>
  );
};
