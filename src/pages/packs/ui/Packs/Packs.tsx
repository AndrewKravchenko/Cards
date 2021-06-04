import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import s from './Packs.module.scss';
import {
  CardPacksType,
  getCardsPacksTC,
  setErrorPacks,
} from '../../bll/PacksReducer';
import { Link } from 'react-router-dom';
import { InputText } from '../../../../common/ui/InputText';
import { InputCheckbox } from '../../../../common/ui/InputCheckbox';
import { Button } from '../../../../common/ui/Button';
import { useDispatch } from 'react-redux';
import { Pagination } from '../../../../common/ui/Paginator/Paginator';
import { PATH } from '../../../../main/ui/App/Routes';
import { Modal } from '../../../../common/ui/Modals/Modal';
import { Search } from '../../../../common/Search/Search';
import { InfoErrorMessage } from '../../../../common/ui/InfoErrorMessage/InfoErrorMessage';

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
  const { CARDS, TRAIN } = PATH;

  const [modalAdd, setModalAdd] = useState<boolean>(false);
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [modalChange, setModalChange] = useState<boolean>(false);
  const [newPackName, setNewPackName] = useState<string>('');
  const [changePackName, setChangePackName] = useState<string>('');
  const [privatPack, setPrivatPack] = useState<boolean>(false);
  const [myPacks, setMyPacks] = useState<boolean>(false);
  const userId = myPacks ? id : '';
  const [PackNameId, setPackNameId] = useState<string>('');
  const [letter, setLetter] = useState<string>('');

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
  const onPackNameAdd = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPackName(e.currentTarget.value);
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
  const updateCardsPackHandler = (cardsPackId: string, cardsPackName: string) => {
    setChangePackName(cardsPackName);
    setPackNameId(cardsPackId);
    setModalChange(true);
  };
  const onPackNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChangePackName(e.currentTarget.value);
  };
  const changeCardsPackSubmit = (changedPackName: string, PackNameId: string) => {
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
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setLetter(e.currentTarget.value);
  };
  const searchCardsPacks = myPacks
    ? cardPacks.filter(p => p.user_id === id).filter(p => {
    return p.name.includes(letter)})
    : cardPacks.filter(p => {
    return p.name.includes(letter);
  });
  const totalPages = Math.ceil(searchCardsPacks.length / pageCount);

  return <div>
    <InfoErrorMessage
      loading={loading}
      error={error}
      action={setErrorPacks('')}
    />
    {modalAdd &&
    <Modal deactivateEditMode={deactivateEditMode}>
      <InputText placeholder={'Name pack'}
                 onChange={onPackNameAdd}
                 value={newPackName}
      />
      <InputCheckbox type={'checkbox'}
                     checked={privatPack}
                     onChangeChecked={setPrivatPack}
      >Private
      </InputCheckbox>
      <Button
        onClick={() => addCardsPackSubmit(newPackName, privatPack)}>
        Submit
      </Button>
    </Modal>}
    {modalDelete &&
    <Modal deactivateEditMode={deactivateEditMode}>
      <Button onClick={deletedCardsPackSubmit}>Yes</Button>
      <Button onClick={deactivateEditMode}>No</Button>
    </Modal>}
    {modalChange &&
    <Modal deactivateEditMode={deactivateEditMode}>
      <InputText placeholder={'Name pack'}
                 onChange={onPackNameChange}
                 value={changePackName}
      />
      <Button disabled={loading}
              onClick={() => changeCardsPackSubmit(changePackName, PackNameId)}>
        Submit
      </Button>
    </Modal>}
    <div>
      <InputCheckbox
        type={'checkbox'}
        checked={myPacks}
        onChangeChecked={handleMyPacks}
        disabled={loading}>
        My packs
      </InputCheckbox>
    </div>

    <Search loading={loading} handleSearch={handleSearch}>
        <div className={s.gridHeaderTable}>
        <div>Name</div>
        <div>CardsCount</div>
        <div>Updated</div>
        <div>Url</div>
        <div>
          <Button disabled={loading} onClick={addCardsPackHandler}>add</Button>
        </div>
        </div>
      <div className={s.hGridContainer}>
      {searchCardsPacks.length === 0 && !loading
          ? 'empty'
          : searchCardsPacks.slice((page - 1) * pageCount, page * pageCount)
            .map((p) => {
              const data = new Date(p.updated).toUTCString().substring(0, 22);

              return <React.Fragment key={p._id}>
                <div>{p.name}</div>
                <div>{p.cardsCount}</div>
                <div>{data}</div>
                <div />
                <div>
                  <Button disabled={loading || id != p.user_id}
                          onClick={() => deletedCardsPackHandler(p._id)}>
                    del</Button>
                  <Button disabled={loading || id != p.user_id}
                          onClick={() => updateCardsPackHandler(p._id, p.name)}>
                    update</Button>
                  <Link to={!loading ? CARDS + '/' + p._id : '#'}
                        className={s.link}>cards</Link>
                  {p.cardsCount > 0
                    ? <Link to={!loading ? TRAIN + '/' + p._id : '#'}
                            className={s.link}>train</Link>
                    : 'train'
                  } </div>
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
    </Search>
  </div>;
};
