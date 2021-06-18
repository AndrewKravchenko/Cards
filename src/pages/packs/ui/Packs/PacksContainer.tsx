import React, {FC, useState} from 'react';
import {Packs} from './Packs';
import {useDispatch, useSelector} from 'react-redux';
import {
    addCardsPackTC,
    deletedCardsPackTC,
    updatedCardsPackTC,
} from 'src/pages/packs/bll/PacksReducer';
import {selectPacks} from 'src/pages/packs/bll/selectPacks';
import {useTypedSelector} from 'src/hooks/useTypedSelector';

export const PacksContainer: FC = () => {
    const dispatch = useDispatch();

    const [page, setPage] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(4);

    const {
        error,
        cardPacks,
        loading,
        cardPacksTotalCount
    } = useSelector(selectPacks)
    const {user: {_id: userId}} = useTypedSelector(
        (state) => state.login
    );

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

    return (
        <Packs
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
        />
    )
};
