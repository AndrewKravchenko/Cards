import React, {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectLogin} from 'src/pages/login/bll/selectLogin';
import {changeAuthTC, logoutTC} from 'src/pages/login/bll/authReducer';
import {ProfileForm} from 'src/pages/profile/ui/ProfileFormContainer/ProfileForm';

export const ProfileFormContainer: FC = () => {
    const dispatch = useDispatch();

    const {
        error,
        loading,
        user
    } = useSelector(selectLogin)

    const changeAuth = (name: string, avatar: string) => {
        dispatch(changeAuthTC(name, avatar));
    };
    const sendLogOut = () => {
        dispatch(logoutTC());
    };

    return (
        <ProfileForm
            loading={loading}
            sendLogOut={sendLogOut}
            changeAuth={changeAuth}
            error={error}
            user={user}
        />
    );
};
