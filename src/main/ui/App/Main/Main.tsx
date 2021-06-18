import React, { FC } from 'react';
import { Routes } from 'src/main/ui/App/Routes';

import s from './Main.module.scss';

export const Main: FC = () => {

  return (
    <main className={s.main}>
      <div className={s.container}>
        <Routes />
      </div>
    </main>
  );
};
