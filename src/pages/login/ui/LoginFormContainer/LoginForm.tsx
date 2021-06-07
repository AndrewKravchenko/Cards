import React, { FC, FormEvent, useState } from 'react';

import s from './LoginForm.module.scss';
import { InputText } from '../../../../common/ui/InputText';
import { Link, Redirect } from 'react-router-dom';
import { Button } from '../../../../common/ui/Button';
import { LoginLinkType } from './LoginFormContainer';
import { InputCheckbox } from '../../../../common/ui/InputCheckbox';
import { randomId } from '../../../../utils/randomId';
import {
  HookInputType,
  useInput,
} from '../../../../hooks/ValidationFormAndrew';
import { ErrorMessage } from '../../../../common/ui/ErrorMessage';
import { InfoErrorMessage } from '../../../../common/ui/InfoErrorMessage/InfoErrorMessage';
import { setErrorLogin } from '../../bll/authReducer';

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

    <InputText placeholder={'Login'}
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
    <InputText placeholder={'Password'}
               type={'password'}
               onChange={e => password.onChange(e)}
               onBlur={password.onBlur}
               value={password.value}
               disabled={loading}
    />
    <InputCheckbox type={'checkbox'}
                   checked={rememberMe}
                   onChangeChecked={setRememberMe}
    > Remember me
    </InputCheckbox>

    <Button type='submit'
            disabled={disabledSubmitBtn}>
      Submit
    </Button>

    <div className={s.linksForm}>
      {loginLinks.map(({ link, title }) => (
        <Link key={randomId()} to={link} className={s.link}>
          {title}
        </Link>
      ))}
    </div>
  </form>;
};
