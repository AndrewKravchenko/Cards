import React, { FC, FormEvent, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import s from './LoginForm.module.scss';
import { Button } from 'src/common/ui/Button';
import { randomId } from 'src/utils/randomId';
import { HookInputType } from 'src/hooks/types';
import { InputText } from 'src/common/ui/InputText';
import { LoginLinkType } from './LoginFormContainer';
import { useInput } from 'src/hooks/ValidationFormAndrew';
import { ErrorMessage } from 'src/common/ui/ErrorMessage';
import { InputCheckbox } from 'src/common/ui/InputCheckbox';
import { setErrorLogin } from 'src/pages/login/bll/authReducer';
import { InfoErrorMessage } from 'src/common/ui/InfoErrorMessage';


type PropsType = {
  loginLinks: LoginLinkType[];
  sendLogin: (email: string, password: string, rememberMe: boolean) => void;
  closeMessage: (error: string) => void;
  loading: boolean;
  error: string;
  redirectLink: string;
  userId: string;
};

export const LoginForm: FC<PropsType> = ({
  loginLinks,
  sendLogin,
  loading,
  error,
  userId,
  closeMessage,
  redirectLink
}) => {
  const [rememberMe, setRememberMe] = useState(false);
  const email = useInput('', { isEmail: true });
  const password = useInput('', {
    minLength: 8,
    isPassword: true
  });

  if (userId) {
    return <Redirect to={redirectLink} />;
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.value.trim() && password.value.trim()) {
      sendLogin(email.value, password.value, rememberMe);
    }
  };

  const closeMessageHandler = (obj?: HookInputType) => () => {
    closeMessage('');
    if (obj) {
      obj.setDirty(false);
    }
  };

  const disabledSubmitBtn = !email.inputValid
      || !password.inputValid
      || loading;

  return <form className={s.form} onSubmit={submitHandler}>
    <InfoErrorMessage
      loading={loading}
      error={error}
      action={setErrorLogin('')}
    />
    {email.isDirty && email.inputError && (
      <ErrorMessage clickHandler={closeMessageHandler(email)}>
        {email.inputError}
      </ErrorMessage>
    )}
    <InputText
        placeholder={'Login'}
        type={'email'}
        onChange={e => email.onChange(e)}
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
        onChange={e => password.onChange(e)}
        onBlur={password.onBlur}
        value={password.value}
        disabled={loading}
    />
    <InputCheckbox
        type={'checkbox'}
        checked={rememberMe}
        onChangeChecked={setRememberMe}
    >
      Remember me
    </InputCheckbox>
    <Button
        type='submit'
        disabled={disabledSubmitBtn}
    >
      Submit
    </Button>
    <div className={s.linksForm}>
      {loginLinks.map(({ link, title }) => (
        <Link
            key={randomId()}
            to={link}
            className={s.link}
        >
          {title}
        </Link>
      ))}
    </div>
  </form>;
};
