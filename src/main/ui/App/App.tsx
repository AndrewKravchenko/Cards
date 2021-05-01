import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import s from './App.module.scss';
import { Header } from './Header';
import { Main } from './Main';
import { isAuthTC } from '../../../pages/login/bll/loginReducer';
import { Preloader } from '../../../common/ui/Preloader';

export const App: FC = () => {
  const isInitial = useSelector<any>(state => state.login.isInitial)
  const dispatch = useDispatch<(action: Function) => Promise<void>>();
  // const [init, setInit] = useState(false);
  useEffect(() => {
    console.log('1234');
    !isInitial &&
    // dispatch(isAuthTC()).then(res => setInit(true));
    dispatch(isAuthTC());
  }, []);
  return (
    <div className={s.app}>
      <Header />

      {/*{init ? <Main /> : <Preloader />}*/}
     <Main />
    </div>
  );
};
