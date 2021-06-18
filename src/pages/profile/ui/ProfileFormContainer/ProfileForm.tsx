import React, {FC, FormEvent, useState} from 'react';
import s from './ProfileForm.module.scss';
import {Button} from 'src/common/ui/Button';
import {InputText} from 'src/common/ui/InputText';
import {InputFile} from 'src/common/ui/InputFile';
import {useInputValue} from 'src/hooks/useInputValue';
import {InfoErrorMessage} from 'src/common/ui/InfoErrorMessage';
import {setErrorLogin, UserType} from 'src/pages/login/bll/authReducer';

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
    let [name, , onNameChange] = useInputValue(user.name);
    let [avatar, , onAvatarChange] = useInputValue(user.avatar);

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

    const renderAvatar = () => {
        if (!editModeAvatar) {
            return (
                <div className={s.avatar}>
                    <div>{'avatar url: '}</div>
                    <div onDoubleClick={activateEditMode('avatar')}>
                        {user.avatar}
                    </div>
                </div>
            )
        }

        return (
            <div>
                <InputText
                    autoFocus={true}
                    onChange={onAvatarChange}
                    onBlur={deactivateEditMode()}
                    value={avatar}
                />
            </div>
        )
    }

    const renderInputName = () => {
        if (!editModeName) {
            return (
                <div>
                    {'name: '}
                    <span
                        onDoubleClick={activateEditMode('name')}
                    >
                        {user.name || ''}
                    </span>
                </div>
            )
        }
        return (
            <div>
                <InputText
                    autoFocus={true}
                    onChange={onNameChange}
                    onBlur={deactivateEditMode()}
                    value={name}
                />
            </div>
        )
    }

    return <form className={s.form} onSubmit={submitHandler}>
        <InfoErrorMessage
            loading={loading}
            error={error}
            action={setErrorLogin('')}
        />
        <div className={s.img}>
            <img src={user.avatar} alt={''}/>
            <InputFile/>
        </div>
        <div>
            {renderAvatar()}
            {renderInputName()}
        </div>
        <Button type='submit' disabled={loading}>
            LogOut
        </Button>
    </form>
};
