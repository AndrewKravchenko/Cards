import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import s from './InfoErrorMessage.module.scss';
import { Preloader } from 'src/common/ui/Preloader';
import { ErrorMessage } from 'src/common/ui/ErrorMessage';
import { ActionsLoginType } from 'src/pages/login/bll/authReducer';
import { ActionsCardsType } from 'src/pages/cards/bll/CardsReducer';
import { ActionsPacksType } from 'src/pages/packs/bll/PacksReducer';
import { RecoveryPassActionsType } from 'src/pages/recoveryPass/bll/recoveryPassActions';

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
  if (!error && !loading){
    return null
  }
  return (
    <div className={s.messageWrapper}>
      {loading && <Preloader text='Sending...' />}
      {error && (
        <ErrorMessage clickHandler={closeMessage} >
          {error}
        </ErrorMessage>
      )}
    </div>
  );
};
