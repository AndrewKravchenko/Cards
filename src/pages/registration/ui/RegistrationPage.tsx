import React, {FC} from 'react';

import s from './RegistrationPage.module.scss';
import {RegistrationFormContainer} from "./RegistrationForm/RegistrationFormContainer";

export const RegistrationPage: FC = () => {

    return (
        <section className={s.page}>
            <h2>Registration</h2>

            <RegistrationFormContainer/>

        </section>
    );
};
