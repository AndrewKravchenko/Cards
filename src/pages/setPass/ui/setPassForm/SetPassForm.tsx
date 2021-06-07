import React, { FC, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import s from './SetPassForm.module.scss';
import { InputText } from '../../../../common/ui/InputText';
import { Button } from '../../../../common/ui/Button';
import { LoginLinkType } from '../../../login/ui/LoginFormContainer/LoginFormContainer';
import {
  HookInputType,
  useInput,
} from '../../../../hooks/ValidationFormAndrew';
import { ErrorMessage } from '../../../../common/ui/ErrorMessage';

type PropsType = {
  loginLink: LoginLinkType;
  setNewPassAuth: (password: string) => void;
  closeMessage: (error: string) => void;
  loading: boolean;
};

export const SetPassForm: FC<PropsType> = ({
  loginLink: { link, title },
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
    if(password.value !== repeatPassword.value){
      repeatPassword.setInputError('Passwords must be same')
    }
    else {
      repeatPassword.setInputError('')
      if ( password.value.trim()) {
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
          <InputText placeholder={'New password'}
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
          <InputText placeholder={'Repeat new password'}
                     type={'password'}
                     onChange={repeatPassword.onChange}
                     onBlur={repeatPassword.onBlur}
                     value={repeatPassword.value}
                     disabled={loading}
          />
            <Button type="submit"
                    disabled={disabledSubmitBtn}>
              Set pass
            </Button>

            <Link to={link} className={s.link}>
                {title}
            </Link>
        </form>
    );
};
