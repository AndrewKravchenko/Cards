import React, {FC, FormEvent, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'src/common/ui/Button';
import s from './RecoveryPassForm.module.scss';
import {InputText} from 'src/common/ui/InputText';
import {InfoErrorMessage} from 'src/common/ui/InfoErrorMessage';
import {LoginLinkType} from 'src/pages/login/ui/LoginFormContainer';
import {recoveryPassActions} from 'src/pages/recoveryPass/bll/recoveryPassActions';

type PropsType = {
  loginLink: LoginLinkType;
  sendEmail: (email: string) => void;
  closeMessage: (error: string) => void;
  setSuccess: (success: boolean) => void;
  loading: boolean;
  success: boolean;
  error: string;
};

export const RecoveryPassForm: FC<PropsType> = ({
  loginLink: { link, title },
  sendEmail,
  setSuccess,
  loading,
  success,
  error,
}) => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (success) {
      setEmail('');
      setSuccess(false);
      setTimeout(()=> {
        alert('Check your email')
      }, 1000)
    }
  }, [success, setSuccess]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.trim()) {
      sendEmail(email);
    }
  };

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
