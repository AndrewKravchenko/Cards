import React, {FC, useState} from 'react';
import {Table} from 'src/common/ui/Table';
import {Button} from 'src/common/ui/Button';
import {Modal} from 'src/common/ui/Modals';
import {InputText} from 'src/common/ui/InputText';
import {Pagination} from 'src/common/ui/Paginator';
import {useInputValue} from 'src/hooks/useInputValue';
import {DoubleRange} from 'src/common/ui/DoubleRange';
import {CardsType} from 'src/pages/cards/dal/CardsApi';
import {setErrorCards} from 'src/pages/cards/bll/CardsReducer';
import {InfoErrorMessage} from 'src/common/ui/InfoErrorMessage';

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
    userId,
}) => {
    const [modalAdd, setModalAdd] = useState<boolean>(false);
    const [modalDelete, setModalDelete] = useState<boolean>(false);
    const [
        cardQuestion,
        setCardQuestion,
        onCardQuestion
    ] = useInputValue<string>('');
    const [
        cardAnswer,
        setCardAnswer,
        onCardAnswerAdd
    ] = useInputValue<string>('');
    const [changeCard, setChangeCard] = useState<string>('');
    const [cardNameId, setCardNameId] = useState<string>('');
    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(5);

    const addCardHandler = () => {
        setModalAdd(true);
    };
    const addCardSubmit = () => {
        if (cardQuestion.trim()) {
            addCard(cardsPack_id, cardQuestion, cardAnswer);
            setModalAdd(false);
            setCardQuestion('');
            setCardAnswer('');
            setPage(1);
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
        id: string,
        cardQuestion: string,
        cardAnswer: string,
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
        ),
    );
    const totalPages = Math.ceil(searchCardsGrade.length / pageCount);
    const buttonAddForHeader =
        <Button
        disabled={
            loading
            || cards.length > 0
            && userId !== cards[0]?.user_id
        }
        onClick={addCardHandler}
    >
        add
    </Button>;
    const showModalAddCard = () => {
        if (modalAdd) {

            return (
                <Modal deactivateEditMode={deactivateEditMode}>
                    <InputText
                        placeholder={'Question'}
                        onChange={onCardQuestion}
                        value={cardQuestion}
                    />
                    <InputText
                        placeholder={'Answer'}
                        onChange={onCardAnswerAdd}
                        value={cardAnswer}
                    />
                    <Button
                        disabled={loading}
                        onClick={addCardSubmit}
                    >
                        Submit
                    </Button>
                </Modal>)
        }
    };
    const showModalDeleteCard = () => {
        if (modalDelete) {

            return (
                <Modal deactivateEditMode={deactivateEditMode}>
                    <Button onClick={deletedCardsPackSubmit}>Yes</Button>
                    <Button onClick={deactivateEditMode}>No</Button>
                </Modal>)
        }
    };
    const showModalChangeCard = () => {
        if (changeCard) {

            return (
                <Modal deactivateEditMode={deactivateEditMode}>
                    <InputText
                        placeholder={'Question card'}
                        onChange={onCardQuestion}
                        value={cardQuestion}
                    />
                    <InputText
                        placeholder={'Answer card'}
                        onChange={onCardAnswerAdd}
                        value={cardAnswer}
                    />
                    <Button
                        disabled={loading}
                        onClick={changeCardPackSubmit}
                    >
                        Submit
                    </Button>
                </Modal>)
        }
    };
    const headersName = [
        'Question',
        'Answer',
        'Grade',
        'Updated',
        'Url',
        buttonAddForHeader
    ];

    return (
        <div>
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
            {showModalAddCard()}
            {showModalDeleteCard()}
            {showModalChangeCard()}
            <Table
                header={headersName}
                userId={userId}
                loading={loading}
                pageCount={pageCount}
                page={page}
                cards={searchCardsGrade}
                updateCardHandler={updateCardHandler}
                deletedCardHandler={deletedCardHandler}
            />
            <Pagination
                totalPages={totalPages}
                handleChangePage={handleChangePage}
                page={page}
                setPageCount={setPageCount}
                pageCount={pageCount}
            />
        </div>
    );
};
