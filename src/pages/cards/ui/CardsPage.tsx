import React, { FC } from 'react';

import s from './Cards.module.scss';
import { CardsContainer } from './CardsContainer/CardsContainer';

export const CardsPage: FC = () => {
  return (
    <section className={s.page}>
      <h2>Cards</h2>

      <CardsContainer />
    </section>
  );
};
