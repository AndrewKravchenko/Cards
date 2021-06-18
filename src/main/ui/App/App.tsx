import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.scss';
import { Header } from './Header';
import { Main } from './Main';
import { isAuthTC } from 'src/pages/login/bll/authReducer';
import { useTypedSelector } from 'src/hooks/useTypedSelector';

export const App: FC = () => {
  const isInitial = useTypedSelector<boolean>(state => state.login.isInitial);
  const dispatch = useDispatch();
  useEffect(() => {
    !isInitial && dispatch(isAuthTC());
  }, [dispatch, isInitial]);

  return (
    <div className="app">
      <Header />

      {isInitial && <Main /> }
    </div>
  );
};
