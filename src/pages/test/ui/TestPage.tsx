import React, { FC } from 'react';

import s from './TestPage.module.scss';
import { TestContainer } from 'src/pages/test/ui/TestContainer';

export const TestPage: FC = () => {
  return (
    <section className={s.page}>
      <h2>Common components:</h2>

      <TestContainer />
    </section>
  );
};
