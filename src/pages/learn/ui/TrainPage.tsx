import React, { FC } from 'react';

import s from './TrainPage.module.scss';
import { Train } from './Train/Train';

export const TrainPage: FC = () => {
  return (
    <section className={s.page}>
      <h2>Train</h2>

      <Train />
    </section>
  );
};
