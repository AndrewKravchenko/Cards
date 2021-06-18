import React, {FC} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
    capitalizeFirstLetter,
    transformLinkToTitle,
} from 'src/utils/textTransform';
import {PATH} from 'src/main/ui/App/Routes';
import {selectLogin} from 'src/pages/login/bll/selectLogin';
import {LoginLinkType} from 'src/pages/login/ui/LoginFormContainer';
import {SetPassForm} from 'src/pages/setPass/ui/setPassForm/SetPassForm';
import {setErrorLogin, setNewPassTC} from 'src/pages/login/bll/authReducer';

export const SetPassFormContainer: FC = () => {
    const dispatch = useDispatch();

    const {token} = useParams<{ token: string }>();
    const {LOGIN} = PATH;
    const {success, loading} = useSelector(selectLogin)
    const loginLink: LoginLinkType = {
        link: LOGIN,
        title: capitalizeFirstLetter(transformLinkToTitle(LOGIN)),
    };
    if (success) {
        return <Redirect to={'/PATH'}/>
    }

    const setNewPassAuth = (password: string) => {
        dispatch(setNewPassTC(password, token));
    };
    const closeMessage = (error: string) => {
        dispatch(setErrorLogin(error));
    };

    return (
        <SetPassForm
            loginLink={loginLink}
            setNewPassAuth={setNewPassAuth}
            closeMessage={closeMessage}
            loading={loading}
        />
    );
};
