import React, {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {PATH} from 'src/main/ui/App/Routes';
import {
    capitalizeFirstLetter,
    transformLinkToTitle
} from 'src/utils/textTransform';
import {RecoveryPassForm} from './RecoveryPassForm';
import {LoginLinkType} from 'src/pages/login/ui/LoginFormContainer';
import {sendEmailAsync} from 'src/pages/recoveryPass/bll/recoveryPassThunk';
import {selectRecoveryPass} from 'src/pages/recoveryPass/bll/selectRecoveryPass';
import {recoveryPassActions} from 'src/pages/recoveryPass/bll/recoveryPassActions';

export const RecoveryPassFormContainer: FC = () => {
    const dispatch = useDispatch();

    const {LOGIN} = PATH;
    const {loading, success, error} = useSelector(selectRecoveryPass)

    const loginLink: LoginLinkType = {
        link: LOGIN,
        title: capitalizeFirstLetter(transformLinkToTitle(LOGIN)),
    };

    const sendEmail = (email: string) => {
        dispatch(sendEmailAsync(email));
    };
    const closeMessage = (error: string) => {
        dispatch(recoveryPassActions.setError(error));
    };
    const setSuccess = (success: boolean) => {
        dispatch(recoveryPassActions.setSuccess(success));
    };

    return (
        <RecoveryPassForm
            loginLink={loginLink}
            sendEmail={sendEmail}
            setSuccess={setSuccess}
            closeMessage={closeMessage}
            loading={loading}
            success={success}
            error={error}
        />
    );
};
