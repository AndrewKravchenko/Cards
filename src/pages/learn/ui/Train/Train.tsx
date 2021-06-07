import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { CardsType } from '../../../cards/dal/CardsApi';
import { Button } from '../../../../common/ui/Button';
import {
  getCardsTC,
  setErrorCards,
  updateGradeCardTC,
} from '../../../cards/bll/CardsReducer';
import s from './Train.module.scss';
import { InfoErrorMessage } from '../../../../common/ui/InfoErrorMessage/InfoErrorMessage';

const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал'];

const getCard = (cards: CardsType[]) => {
  const sum = cards.reduce((acc, card) =>
    acc + (6 - card.grade) * (6 - card.grade), 0);
  const rand = Math.random() * sum;
  const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
      const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
      return { sum: newSum, id: newSum < rand ? i : acc.id };
    }
    , { sum: 0, id: -1 });
  return cards[res.id + 1];
};

export const Train = () => {

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [first, setFirst] = useState<boolean>(true);
  const [estimate, setEstimate] = useState<number>(-1);
  const { cards } = useTypedSelector((state) => state.cards);
  const error = useTypedSelector<string>((state) => state.cards.error);

  const [card, setCard] = useState<CardsType>({
    _id: 'fake',
    cardsPack_id: '',
    user_id: '',
    answer: 'answer fake',
    question: 'question fake',
    grade: 0,
    shots: 0,
    type: '',
    rating: 0,
    __v: 0,
    created: '',
    updated: '',
  });

  const loading = useTypedSelector<boolean>((state) => state.cards.loading);

  const { cardsPack_id } = useParams<{ cardsPack_id: string }>();
  const dispatch: Function = useDispatch();

  useEffect(() => {
    if (first) {
      dispatch(getCardsTC(cardsPack_id));
      setFirst(false);
    }
    if (cards.length > 0) setCard(getCard(cards));
    return () => {
    };
  }, [dispatch, cardsPack_id, cards, first]);

  const setEstimateHandler = (value: number) => {
    setEstimate(value);
  };
  const onNext = () => {
    setIsChecked(false);

    if (cards.length > 0) {
      dispatch(updateGradeCardTC(card.cardsPack_id, card._id, estimate + 1));
      setCard(getCard(cards));
      setEstimate(-1);
    } else {
    }
  };

  return (
    <div>
      <InfoErrorMessage
        loading={loading}
        error={error}
        action={setErrorCards('')}
      />
      <div className={s.trainBlock}>
        <div>{card.question}</div>
        <div>
          <Button onClick={() => setIsChecked(true)}>check</Button>
        </div>

        {isChecked && (
          <>
            <div>{card.answer}</div>
            <div className={s.grade}>
              {grades.map((g, value) => (
                <Button className={estimate === value ? s.active : ''} key={'grade-' + value}
                        onClick={() => {
                          setEstimateHandler(value);
                        }}>{g}</Button>
              ))}
            </div>
            <div><Button onClick={onNext}>next</Button></div>
          </>
        )}
      </div>
    </div>
  );
};
