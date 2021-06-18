import React, {FC} from 'react';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
    capitalizeFirstLetter,
    transformLinkToTitle
} from 'src/utils/textTransform';
import {PATH} from 'src/main/ui/App/Routes';
import {RegistrationForm} from './RegistrationForm';
import {selectLogin} from 'src/pages/login/bll/selectLogin';
import {LoginLinkType} from 'src/pages/login/ui/LoginFormContainer';
import {CreateAuthTC, setErrorLogin} from 'src/pages/login/bll/authReducer';

export const RegistrationFormContainer: FC = () => {
    const dispatch = useDispatch();

    const {LOGIN} = PATH;
    const {success, loading} = useSelector(selectLogin)
    const loginLink: LoginLinkType = {
        link: LOGIN,
        title: capitalizeFirstLetter(transformLinkToTitle(LOGIN)),
    };
    if (success) {
        return <Redirect to={'/PATH'}/>
    }

    const createAuth = (email: string, password: string,) => {
        dispatch(CreateAuthTC(email, password));
    };
    const closeMessage = (error: string) => {
        dispatch(setErrorLogin(error));
    };

    return (
        <RegistrationForm
            loginLink={loginLink}
            createAuth={createAuth}
            closeMessage={closeMessage}
            loading={loading}
        />
    );
};
