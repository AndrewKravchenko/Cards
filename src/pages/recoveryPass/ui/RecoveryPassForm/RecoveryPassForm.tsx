import React, { FC, FormEvent, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import s from './RecoveryPassForm.module.scss';
import { InputText } from '../../../../common/ui/InputText';
import { Button } from '../../../../common/ui/Button';
import { LoginLinkType } from '../../../login/ui/LoginFormContainer/LoginFormContainer';
import { InfoErrorMessage } from '../../../../common/ui/InfoErrorMessage/InfoErrorMessage';
import { recoveryPassActions } from '../../bll/recoveryPassActions';

type PropsType = {
  loginLink: LoginLinkType;
  sendEmail: (email: string) => void;
  closeMessage: (error: string) => void;
  setSuccess: (success: boolean) => void;
  loading: boolean;
  success: boolean;
  error: string;
  redirectLink: string;
};

export const RecoveryPassForm: FC<PropsType> = ({
  loginLink: { link, title },
  sendEmail,
  setSuccess,
  loading,
  success,
  error,
  redirectLink,
}) => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    console.log('asdasd');
    if (success) {
      setEmail('');
      setSuccess(false);
    }
  }, [success, setSuccess]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.trim()) {
      sendEmail(email);
    }
  };

  if (success) {
    return <Redirect to={redirectLink} />;
  }

  return (
    <form className={s.form} onSubmit={submitHandler}>
      <InfoErrorMessage
        loading={loading}
        error={error}
        action={recoveryPassActions.setError('')}
      />

      <InputText
        type="email"
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        disabled={loading}
      />

      <Button type="submit" disabled={loading}>
        Submit
      </Button>

      <Link to={link} className={s.link}>
        {title}
      </Link>
    </form>
  );
};
