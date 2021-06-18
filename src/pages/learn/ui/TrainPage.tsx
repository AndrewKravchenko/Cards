import React, { FC } from 'react';
import { Train } from './Train/Train';

import s from './TrainPage.module.scss';

export const TrainPage: FC = () => {
  return (
    <section className={s.page}>
      <h2>Train</h2>

      <Train />
    </section>
  );
};
