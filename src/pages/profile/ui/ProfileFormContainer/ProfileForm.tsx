import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Button } from '../../../../common/ui/Button';
import s
  from './ProfileForm.module.scss';
import { InputText } from '../../../../common/ui/InputText';
import { setErrorLogin, UserType } from '../../../login/bll/authReducer';
import { InfoErrorMessage } from '../../../../common/ui/InfoErrorMessage/InfoErrorMessage';
import { FileInput } from '../../../../common/ui/InputFile';

type PropsType = {
  loading: boolean;
  sendLogOut: () => void;
  changeAuth: (name: string, avatar: string) => void;
  error: string;
  user: UserType;
};

export const ProfileForm: FC<PropsType> = ({
                                             loading,
                                             sendLogOut,
                                             error,
                                             user,
                                             changeAuth,
                                           }) => {
  let [editModeName, setEditModeName] = useState(false);
  let [editModeAvatar, setEditModeAvatar] = useState(false);
  let [name, setName] = useState(user.name);
  let [avatar, setAvatar] = useState(user.avatar);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendLogOut();
  };

  const activateEditMode = (value: string) => () => {
    if (value === 'name') {
      setEditModeName(true);
    } else {
      setEditModeAvatar(true);
    }
  };

  const deactivateEditMode = () => () => {
    setEditModeName(false);
    setEditModeAvatar(false);
    changeAuth(name, avatar !== undefined ? avatar : '');
  };
  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };
  const onAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAvatar(e.currentTarget.value);
  };

  return <form className={s.form} onSubmit={submitHandler}>
    <InfoErrorMessage
      loading={loading}
      error={error}
      action={setErrorLogin('')}
    />

    <div className={s.img}>
      <img src={user.avatar} alt={''} />
      <FileInput />
    </div>

      <div>
        {
          !editModeAvatar ?
            <div className={s.avatar}>
             <div>{'avatar url: '}</div>
              <div onDoubleClick={activateEditMode('avatar')}>
           {user.avatar}
            </div>
            </div> : <div>
              <InputText autoFocus={true}
                         onChange={onAvatarChange}
                         onBlur={deactivateEditMode()}
                         value={avatar}
              />
            </div>
        }
        {
          !editModeName ?
            <div>
              {'name: '}
              <span onDoubleClick={activateEditMode('name')}>
                        {user.name || ''}
                    </span>
            </div> : <div>
              <InputText autoFocus={true}
                         onChange={onNameChange}
                         onBlur={deactivateEditMode()}
                         value={name}
              />
            </div>
        }
      </div>
    <Button type='submit' disabled={loading}>LogOut</Button>
  </form>
};
