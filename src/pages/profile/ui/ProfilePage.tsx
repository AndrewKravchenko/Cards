import React, { FC } from 'react';
import s from './ProfilePage.module.scss';
import { ProfileFormContainer } from 'src/pages/profile/ui/ProfileFormContainer';

export const ProfilePage: FC = () => {
  return (
    <section className={s.page}>
      <h2>Profile</h2>

      <ProfileFormContainer/>
    </section>
  );
};
