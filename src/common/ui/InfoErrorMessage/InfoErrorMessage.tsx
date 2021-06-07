import React, { FC } from 'react';
import s from './InfoErrorMessage.module.scss';
import { Preloader } from '../Preloader';
import { ErrorMessage } from '../ErrorMessage';
import { ActionsCardsType } from '../../../pages/cards/bll/CardsReducer';
import { ActionsPacksType } from '../../../pages/packs/bll/PacksReducer';
import { useDispatch } from 'react-redux';
import { ActionsLoginType } from '../../../pages/login/bll/authReducer';
import { RecoveryPassActionsType } from '../../../pages/recoveryPass/bll/recoveryPassActions';

type PropsType = {
  error: string;
  loading: boolean;
  action: ActionsCardsType
          | ActionsPacksType
          | ActionsLoginType
          | RecoveryPassActionsType;
};

export const InfoErrorMessage: FC<PropsType> = ({
  error,
  loading,
  action
}) => {
  const dispatch = useDispatch();

  const closeMessage = () => {
    dispatch(action);
  };
  return (
    <div className={s.messageWrapper}>
      {loading && <Preloader text='Sending...' />}
      {error && (
        <ErrorMessage clickHandler={closeMessage}>
          {error}
        </ErrorMessage>
      )}
    </div>
  );
};
