import React, { FC } from 'react';

import s from './Header.module.scss';
import { NavContainer } from './Nav/NavContainer';

export const Header: FC = () => {

  return (
    <header className={s.header}>
      <div className={s.container}>
        <NavContainer />
      </div>
    </header>
  );
};
