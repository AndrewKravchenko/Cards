import React, { FC, useState } from 'react';
import { Packs } from './Packs';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCardsPackTC,
  deletedCardsPackTC,
  updatedCardsPackTC,
} from '../../bll/PacksReducer';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { selectPacks } from '../../bll/selectPacks';

export const PacksContainer: FC = () => {
  const dispatch = useDispatch();

  const {
    error,
    cardPacks,
    loading,
    cardPacksTotalCount,
  } = useSelector(selectPacks)
  const {user: {_id: userId}} = useTypedSelector(
    (state) => state.login
  );
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(4);

  const deletedCardsPack = (cardsPackId: string) => {
    dispatch(deletedCardsPackTC(
      cardsPackId, "", cardPacksTotalCount, page
    ));
  };
  const updatedCardsPack = (changedPackName: string, cardsPackId: string) => {
    dispatch(updatedCardsPackTC(
      changedPackName, cardsPackId, '', cardPacksTotalCount, page
    ));
  };
  const addCardsPack = (name: string, privat: boolean) => {
    dispatch(addCardsPackTC(
      name, privat, '', cardPacksTotalCount, page
    ));
  };

  return <Packs
    userId={userId}
    deletedCardsPack={deletedCardsPack}
    updatedCardsPack={updatedCardsPack}
    addCardsPack={addCardsPack}
    cardPacks={cardPacks}
    loading={loading}
    error={error}
    cardPacksTotalCount={cardPacksTotalCount}
    page={page}
    setPage={setPage}
    pageCount={pageCount}
    setPageCount={setPageCount}
  />;
};
