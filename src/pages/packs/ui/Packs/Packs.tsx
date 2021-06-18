import React, {FC, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
    CardPacksType,
    getCardsPacksTC,
    setErrorPacks,
} from 'src/pages/packs/bll/PacksReducer';
import {Table} from 'src/common/ui/Table';
import {Modal} from 'src/common/ui/Modals';
import {Button} from 'src/common/ui/Button';
import {Search} from 'src/common/ui/Search';
import {InputText} from 'src/common/ui/InputText';
import {Pagination} from 'src/common/ui/Paginator';
import {useInputValue} from 'src/hooks/useInputValue';
import {InputCheckbox} from 'src/common/ui/InputCheckbox';
import {InfoErrorMessage} from 'src/common/ui/InfoErrorMessage';

type PropsType = {
    deletedCardsPack: (cardId: string) => void;
    updatedCardsPack: (changedPackName: string, changePackNameId: string) => void;
    addCardsPack: (name: string, privat: boolean) => void;
    cardPacks: CardPacksType[];
    loading: boolean;
    error: string;
    userId: string;
    cardPacksTotalCount: number;
    page: number;
    setPage: (page: number) => void;
    pageCount: number;
    setPageCount: (pageCount: number) => void;
};

export const Packs: FC<PropsType> = ({
    deletedCardsPack,
    updatedCardsPack,
    addCardsPack,
    cardPacks,
    loading,
    error,
    userId: id,
    cardPacksTotalCount,
    page,
    setPage,
    pageCount,
    setPageCount,
}) => {

    const [modalAdd, setModalAdd] = useState<boolean>(false);
    const [modalDelete, setModalDelete] = useState<boolean>(false);
    const [modalChange, setModalChange] = useState<boolean>(false);
    const [
        newPackName,
        setNewPackName,
        onPackNameAdd
    ] = useInputValue<string>('');
    const [
        changePackName,
        setChangePackName,
        onPackNameChange
    ] = useInputValue<string>('');
    const [privatPack, setPrivatPack] = useState<boolean>(false);
    const [myPacks, setMyPacks] = useState<boolean>(false);
    const userId = myPacks ? id : '';
    const [PackNameId, setPackNameId] = useState<string>('');
    const [letter, , handleSearch] = useInputValue<string>('');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCardsPacksTC(
            userId,
            cardPacksTotalCount
                ? cardPacksTotalCount + 5
                : 2000000,
            page
        ));
    }, [dispatch]);

    const addCardsPackHandler = () => {
        setModalAdd(true);
    };
    const addCardsPackSubmit = (
        newPackName: string, privat: boolean) => {
        if (newPackName.trim()) {
            addCardsPack(newPackName, privat);
            setModalAdd(false);
            setNewPackName('');
            setPrivatPack(false);
            setPage(1)
        }
    };
    const updateCardsPackHandler = (
        cardsPackId: string,
        cardsPackName: string
    ) => {
        setChangePackName(cardsPackName);
        setPackNameId(cardsPackId);
        setModalChange(true);
    };
    const changeCardsPackSubmit = (
        changedPackName: string,
        PackNameId: string
    ) => {
        if (changedPackName.trim()) {
            updatedCardsPack(changedPackName, PackNameId);
            setModalChange(false);
            setChangePackName('');
        }
    };
    const deletedCardsPackHandler = (cardsPackId: string) => {
        setPackNameId(cardsPackId);
        setModalDelete(true);
    };
    const deletedCardsPackSubmit = () => {
        deletedCardsPack(PackNameId);
        setModalDelete(false);
    };
    const deactivateEditMode = () => {
        setModalAdd(false);
        setModalChange(false);
        setModalDelete(false);
    };
    const handleChangePage = (page: number) => {
        setPage(page);
    };
    const handleMyPacks = () => {
        myPacks ? setMyPacks(false) : setMyPacks(true);
        setPage(1);
    };
    const searchCardsPacks = myPacks
        ? cardPacks.filter(p => p.user_id === id).filter(p => {
            return p.name.includes(letter)
        })
        : cardPacks.filter(p => {
            return p.name.includes(letter);
        });
    const totalPages = Math.ceil(searchCardsPacks.length / pageCount);
    const buttonAddForHeader =
        <Button
            disabled={loading}
            onClick={addCardsPackHandler}
        >
            add
        </Button>;
    const headersName = [
        'Name',
        'CardsCount',
        'Updated',
        'Url',
        buttonAddForHeader
    ];

    const showModalChangePack = () => {
        if (modalChange) {
            const btnChangedCardsP = () =>
                changeCardsPackSubmit(changePackName, PackNameId);

            return (
                <Modal deactivateEditMode={deactivateEditMode}>
                    <InputText
                        placeholder={'Name pack'}
                        onChange={onPackNameChange}
                        value={changePackName}
                    />
                    <Button
                        disabled={loading}
                        onClick={btnChangedCardsP}
                    >
                        Submit
                    </Button>
                </Modal>
            )
        }
    }
    const showModalAddPack = () => {
        if (modalAdd) {
            const btnAddCardsP = () =>
                addCardsPackSubmit(newPackName, privatPack);

            return (
                <Modal deactivateEditMode={deactivateEditMode}>
                    <InputText
                        placeholder={'Name pack'}
                        onChange={onPackNameAdd}
                        value={newPackName}
                    />
                    <InputCheckbox
                        type={'checkbox'}
                        checked={privatPack}
                        onChangeChecked={setPrivatPack}
                    >
                        Private
                    </InputCheckbox>
                    <Button
                        onClick={btnAddCardsP}
                    >
                        Submit
                    </Button>
                </Modal>
            )
        }
    };
    const showModalDeletePack = () => {
        if (modalDelete) {
            return (
                <Modal deactivateEditMode={deactivateEditMode}>
                    <Button onClick={deletedCardsPackSubmit}>
                        Yes
                    </Button>
                    <Button onClick={deactivateEditMode}>
                        No
                    </Button>
                </Modal>
            )
        }
    };

    return <div>
        <InfoErrorMessage
            loading={loading}
            error={error}
            action={setErrorPacks('')}
        />
        {showModalAddPack()}
        {showModalDeletePack()}
        {showModalChangePack()}
        <div>
            <InputCheckbox
                type={'checkbox'}
                checked={myPacks}
                onChangeChecked={handleMyPacks}
                disabled={loading}
            >
                My packs
            </InputCheckbox>
        </div>
        <div className="table-fifth-column">
            <Search
                loading={loading}
                handleSearch={handleSearch}
            />
            <Table
                header={headersName}
                userId={id}
                loading={loading}
                pageCount={pageCount}
                page={page}
                packs={searchCardsPacks}
                updateCardsPackHandler={updateCardsPackHandler}
                deletedCardsPackHandler={deletedCardsPackHandler}
            />
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
