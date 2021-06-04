import React, { ChangeEvent, FC, useState } from 'react';
import s from './Cards.module.scss';
import { CardsType } from '../../dal/CardsApi';
import { Button } from '../../../../common/ui/Button';
import { InputText } from '../../../../common/ui/InputText';
import { Pagination } from '../../../../common/ui/Paginator/Paginator';
import { Modal } from '../../../../common/ui/Modals/Modal';
import { DoubleRange } from '../../../../common/ui/DoubleRange/DoubleRange';
import { InfoErrorMessage } from '../../../../common/ui/InfoErrorMessage/InfoErrorMessage';
import { setErrorCards } from '../../bll/CardsReducer';

type PropsType = {
  addCard: (cardsPack_id: string, question: string, answer: string) => void;
  updatedCard: (_id: string, question: string, answer: string) => void;
  deleteCard: (CardId: string) => void;
  loading: boolean;
  error: string;
  cardsPack_id: string;
  cards: CardsType[];
  page: number;
  setPage: (page: number) => void;
  pageCount: number;
  setPageCount: (page: number) => void;
  userId: string;
};

export const Cards: FC<PropsType> = ({
  loading,
  error,
  cards,
  addCard,
  updatedCard,
  cardsPack_id,
  deleteCard,
  page,
  setPage,
  pageCount,
  setPageCount,
  userId
}) => {

  const [modalAdd, setModalAdd] = useState<boolean>(false);
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [cardQuestion, setCardQuestion] = useState<string>('');
  const [cardAnswer, setCardAnswer] = useState<string>('');
  const [changeCard, setChangeCard] = useState<string>('');
  const [cardNameId, setCardNameId] = useState<string>('');
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(5);
  const addCardHandler = () => {
    setModalAdd(true);
  };
  const onCardQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    setCardQuestion(e.currentTarget.value);
  };
  const onCardAnswerAdd = (e: ChangeEvent<HTMLInputElement>) => {
    setCardAnswer(e.currentTarget.value);
  };
  const addCardSubmit = () => {
    if (cardQuestion.trim()) {
      addCard(cardsPack_id, cardQuestion, cardAnswer);
      setModalAdd(false);
      setCardQuestion('');
      setCardAnswer('');
      setPage(1)
    }
  };
  const deactivateEditMode = () => {
    setModalAdd(false);
    setModalDelete(false);
    setChangeCard('');
    setCardQuestion('');
    setCardAnswer('');
  };
  const deletedCardHandler = (cardId: string) => {
    setCardNameId(cardId);
    setModalDelete(true);
  };
  const deletedCardsPackSubmit = () => {
    deleteCard(cardNameId);
    setModalDelete(false);
  };
  const updateCardHandler = (
    id: string,cardQuestion: string, cardAnswer: string
  ) => {
    setChangeCard(id);
    setCardQuestion(cardQuestion);
    setCardAnswer(cardAnswer);
  };
  const changeCardPackSubmit = () => {
    if (cardQuestion.trim()) {
      updatedCard(changeCard, cardQuestion, cardAnswer);
      setChangeCard('');
      setCardQuestion('');
      setCardAnswer('');
    }
  };
  const handleChangePage = (page: number) => {
    setPage(page);
  };
  const onChangeRange = (value: number[]) => {
    setValue1(value[0]);
    setValue2(value[1]);
  };
  const searchCardsGrade = cards.filter(p => (
      p.grade >= value1 && p.grade <= value2
    )
  );
  const totalPages = Math.ceil(searchCardsGrade.length / pageCount);
  return <div>
    <InfoErrorMessage
      loading={loading}
      error={error}
      action={setErrorCards('')}
    />
    <div>
      <DoubleRange
        onChangeRange={onChangeRange}
        value={[value1, value2]}
        min={0}
        max={5}
        step={0.1}
      />
    </div>
    {modalAdd &&
    <Modal deactivateEditMode={deactivateEditMode}>
      <InputText
        placeholder={'Question'}
        onChange={onCardQuestion}
        value={cardQuestion}
      />
      <InputText placeholder={'Answer'}
                 onChange={onCardAnswerAdd}
                 value={cardAnswer}
      />
      <Button disabled={loading}
              onClick={addCardSubmit}>Submit</Button>
    </Modal>}
    {modalDelete &&
    <Modal deactivateEditMode={deactivateEditMode}>
      <Button onClick={deletedCardsPackSubmit}>Yes</Button>
      <Button onClick={deactivateEditMode}>No</Button>
    </Modal>}
    {changeCard &&
    <Modal deactivateEditMode={deactivateEditMode}>
      <InputText placeholder={'Question card'}
                 onChange={onCardQuestion}
                 value={cardQuestion}
      />
      <InputText placeholder={'Answer card'}
                 onChange={onCardAnswerAdd}
                 value={cardAnswer}
      />
      <Button disabled={loading}
              onClick={changeCardPackSubmit}>Submit</Button>
    </Modal>}
    <div className={s.gridHeaderTable}>
      <div>Question</div>
      <div>Answer</div>
      <div>Grade</div>
      <div>Updated</div>
      <div>Url</div>
      <div>
        <Button
          disabled={loading || userId != cards[0]?.user_id}
          onClick={addCardHandler}
        >add
        </Button>
      </div>
    </div>
    <div className={s.hGridContainer}>
    {searchCardsGrade.length === 0 && !loading
        ? 'empty'
        : searchCardsGrade.slice((page - 1) * pageCount, page * pageCount)
          .map((c) => {
        const data = new Date(c.updated).toUTCString().substring(0, 22);
        const onUpdateCardClick = () =>
          updateCardHandler(c._id, c.question, c.answer);

        return <React.Fragment key={c._id}>
          <div>{c.question}</div>
          <div>{c.answer}</div>
          <div>{c.grade}</div>
          <div>{data}</div>
          <div />
          <div>
            <Button disabled={loading || userId != c.user_id}
                    onClick={() => deletedCardHandler(c._id)}>
              del
            </Button>
            <Button disabled={loading || userId != c.user_id}
                    onClick={onUpdateCardClick}>
              update
            </Button>
          </div>
        </React.Fragment>;
      })}
    </div>
    <Pagination
      totalPages={totalPages}
      handleChangePage={handleChangePage}
      page={page}
      setPageCount={setPageCount}
      pageCount={pageCount}
    />
  </div>;
};
