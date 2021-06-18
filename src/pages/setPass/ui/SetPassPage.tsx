import React, { FC } from 'react';
import s from './SetPassPage.module.scss';
import {
  SetPassFormContainer
} from 'src/pages/setPass/ui/setPassForm/SetPassFormContainer';

export const SetPassPage: FC = () => {
  return (
    <section className={s.page}>
      <h2>Set New Password</h2>
      <SetPassFormContainer/>
    </section>
  );
};
