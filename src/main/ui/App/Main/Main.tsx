import React, { FC } from 'react';

import s from './Main.module.scss';
import { Routes } from '../Routes';

export const Main: FC = () => {

  return (
    <main className={s.main}>
      <div className={s.container}>
        <Routes />
      </div>
    </main>
  );
};
