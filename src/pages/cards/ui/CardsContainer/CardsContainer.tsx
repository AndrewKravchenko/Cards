import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Cards } from './Cards';
import { useTypedSelector } from 'src/hooks/useTypedSelector';
import {
  addCardTC,
  deleteCardTC,
  getCardsTC,
  updateCardTC,
} from 'src/pages/cards/bll/CardsReducer';
import { selectCards } from 'src/pages/cards/bll/selectCards';

export const CardsContainer: FC = () => {
  const {error, cards, cardsTotalCount, loading} = useSelector(selectCards)
  const userId = useTypedSelector<string>((state) =>
    state.login.user._id);

  const pageCountInitialState =
    (cards.length < 4 && cards.length > 0)
    ? cards.length
    : 4;

  const { cardsPack_id } = useParams<{ cardsPack_id: string }>();
  const [pageCount, setPageCount] = useState<number>(pageCountInitialState);
  const [page, setPage] = useState<number>(1);

  const dispatch = useDispatch();
  useEffect(() => {
    if (cards.length < 4 && cards.length > 0)
      setPageCount(cards.length);
  }, [cards]);
  useEffect(() => {
    if (cardsPack_id) {
      dispatch(getCardsTC(cardsPack_id,
        cardsTotalCount > 0
          ? cardsTotalCount + 5
          : 2000000,
          page
      ));
    }
  }, [dispatch]);

  const addCard = (cardsPack_id: string, question: string, answer: string) => {
    dispatch(addCardTC(
      cardsPack_id,
      question,
      answer,
      cardsTotalCount + 1,
      page
    ));
  };
  const updatedCard = (_id: string, question: string, answer: string) => {
    dispatch(updateCardTC(
      _id,
      question,
      answer,
      cardsPack_id,
      cardsTotalCount,
      page
    ));
  };
  const deleteCard = (cardId: string) => {
    dispatch(deleteCardTC(
      cardId,
      cardsPack_id,
      cardsTotalCount,
      page
    ));
  };

  return (
      <Cards
          loading={loading}
          cards={cards}
          error={error}
          cardsPack_id={cardsPack_id}
          addCard={addCard}
          updatedCard={updatedCard}
          deleteCard={deleteCard}
          page={page}
          setPage={setPage}
          pageCount={pageCount}
          setPageCount={setPageCount}
          userId={userId}
      />
  );
};
