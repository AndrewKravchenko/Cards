import React, {FC, FormEvent} from 'react';
import {Link} from 'react-router-dom';

import s from './SetPassForm.module.scss';
import {Button} from 'src/common/ui/Button';
import {HookInputType} from 'src/hooks/types';
import {InputText} from 'src/common/ui/InputText';
import {ErrorMessage} from 'src/common/ui/ErrorMessage';
import {useInput} from 'src/hooks/ValidationFormAndrew';
import {LoginLinkType} from 'src/pages/login/ui/LoginFormContainer';

type PropsType = {
    loginLink: LoginLinkType;
    setNewPassAuth: (password: string) => void;
    closeMessage: (error: string) => void;
    loading: boolean;
};

export const SetPassForm: FC<PropsType> = ({
    loginLink: {link, title},
    setNewPassAuth,
    closeMessage,
    loading,
}) => {
    const password = useInput('', {
        minLength: 8,
        isPassword: true
    });
    const repeatPassword = useInput('', {
        minLength: 8,
        repeatPass: true,
    });
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password.value !== repeatPassword.value) {
            repeatPassword.setInputError('Passwords must be same')
        } else {
            repeatPassword.setInputError('')
            if (password.value.trim()) {
                setNewPassAuth(password.value);
            }
        }
    };
    const closeMessageHandler = (obj?: HookInputType) => () => {
        closeMessage('');
        if (obj) {
            obj.setDirty(false);
            obj.setInputError('')
        }
    };
    const disabledSubmitBtn = !password.inputValid
        || !repeatPassword.inputValid
        || loading;

    return (
        <form className={s.form} onSubmit={submitHandler}>
            {password.isDirty && password.inputError && (
                <ErrorMessage clickHandler={closeMessageHandler(password)}>
                    {password.inputError}
                </ErrorMessage>
            )}
            <InputText
                placeholder={'New password'}
                type={'password'}
                onChange={password.onChange}
                onBlur={password.onBlur}
                value={password.value}
                disabled={loading}
            />
            {repeatPassword.isDirty && repeatPassword.inputError && (
                <ErrorMessage
                    clickHandler={closeMessageHandler(repeatPassword)}>
                    {repeatPassword.inputError}
                </ErrorMessage>
            )}
            <InputText
                placeholder={'Repeat new password'}
                type={'password'}
                onChange={repeatPassword.onChange}
                onBlur={repeatPassword.onBlur}
                value={repeatPassword.value}
                disabled={loading}
            />
            <Button
                type="submit"
                disabled={disabledSubmitBtn}
            >
                Set pass
            </Button>
            <Link to={link} className={s.link}>
                {title}
            </Link>
        </form>
    );
};
