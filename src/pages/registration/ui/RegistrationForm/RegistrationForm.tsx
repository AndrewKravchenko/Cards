import React, { FC, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import s from './RegistrationForm.module.scss';
import { Button } from 'src/common/ui/Button';
import { HookInputType } from 'src/hooks/types';
import { InputText } from 'src/common/ui/InputText';
import { useInput } from 'src/hooks/ValidationFormAndrew';
import { ErrorMessage } from 'src/common/ui/ErrorMessage';
import { LoginLinkType } from 'src/pages/login/ui/LoginFormContainer';

type PropsType = {
  loginLink: LoginLinkType;
  createAuth: (email: string, password: string) => void;
  closeMessage: (error: string) => void;
  loading: boolean;
};

export const RegistrationForm: FC<PropsType> = ({
  loginLink: { link, title },
  createAuth,
  closeMessage,
  loading,
}) => {
  const email = useInput('', { isEmail: true });
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
    if(password.value !== repeatPassword.value){
      repeatPassword.setInputError('Passwords must be same')
    }
    else {
      repeatPassword.setInputError('')
      if (email.value.trim() && password.value.trim()) {
        createAuth(email.value, password.value);
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
  const disabledSubmitBtn = !email.inputValid
    || !password.inputValid
    || !repeatPassword.inputValid
    || loading;

    return (
        <form className={s.form} onSubmit={submitHandler}>
          {email.isDirty && email.inputError && (
            <ErrorMessage clickHandler={closeMessageHandler(email)}>
              {email.inputError}
            </ErrorMessage>
          )}
          <InputText
              placeholder={'Email'}
              type={'email'}
              onChange={email.onChange}
              onBlur={email.onBlur}
              value={email.value}
              disabled={loading}
          />
          {password.isDirty && password.inputError && (
            <ErrorMessage clickHandler={closeMessageHandler(password)}>
              {password.inputError}
            </ErrorMessage>
          )}
          <InputText
              placeholder={'Password'}
              type={'password'}
              onChange={password.onChange}
              onBlur={password.onBlur}
              value={password.value}
              disabled={loading}
          />
          {repeatPassword.isDirty && repeatPassword.inputError && (
            <ErrorMessage clickHandler={closeMessageHandler(repeatPassword)}>
              {repeatPassword.inputError}
            </ErrorMessage>
          )}
          <InputText
              placeholder={'Repeat password'}
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
              Sing Up
            </Button>
            <Link to={link} className={s.link}>
              {title}
            </Link>
        </form>
    );
};
