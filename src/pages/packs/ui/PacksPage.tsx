import React, { FC } from 'react';

import s from './Packs.module.scss';
import { PacksContainer } from 'src/pages/packs/ui/Packs/PacksContainer';

export const PacksPage: FC = () => {
  return (
    <section className={s.page}>
      <h2>Card packs</h2>

      <PacksContainer />
    </section>
  );
};
