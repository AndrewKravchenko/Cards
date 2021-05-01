import React, {FC, FormEvent} from 'react';
import { Link } from 'react-router-dom';

import s from './RegistrationForm.module.scss'
import {InputText} from "../../../../common/ui/InputText";
import {Button} from "../../../../common/ui/Button";
import { LoginLinkType } from '../../../login/ui/LoginFormContainer/LoginFormContainer';


type PropsType = {
    loginLink: LoginLinkType;
};

export const RegistrationForm: FC<PropsType> = ({loginLink: { link, title }}) => {
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submit');
    };

    return (
        <form className={s.form} onSubmit={submitHandler}>
            <InputText type="email" placeholder="Email" />
            <InputText type="password" placeholder="Password" />
            <InputText type="password" placeholder="Repeat password"/>

            <Button type="submit" >Sing Up</Button>

            <Link to={link} className={s.link}>
                {title}
            </Link>
        </form>
    );
};