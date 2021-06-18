import React from 'react';
import {Link} from 'react-router-dom';
import './Table.scss';
import {Button} from 'src/common/ui/Button';
import {CardPacksType} from 'src/pages/packs/bll/PacksReducer';
import {PATH} from 'src/main/ui/App/Routes';

export type ContentPacksProps = {
  packs: Array<CardPacksType>
  loading: boolean
  page: number
  pageCount: number
  userId: string
  updateCardsPackHandler?: (cardsPackId: string, cardsPackName: string) => void
  deletedCardsPackHandler?: (cardsPackId: string) => void
};

export const ContentPacks: React.FC<ContentPacksProps> = ({
  packs,
  loading,
  page,
  pageCount,
  userId,
  updateCardsPackHandler,
  deletedCardsPackHandler
}) => {
  const { CARDS, TRAIN } = PATH;

  return (
      <div className="table-fifth-column">
        <div className={"hGridContainer"}>
          {packs.length  === 0 && !loading
          ? 'empty'
          : packs.slice((page - 1) * pageCount, page * pageCount)
             .map((el)=> {
               const data = new Date(el.updated).toUTCString().substring(0, 22);
               if (el.name) {
                   const onDeletedCardsPackClick = () => {
                       deletedCardsPackHandler
                       && deletedCardsPackHandler(el._id);
                }
                const onUpdateCardsPackClick = () => {
                       updateCardsPackHandler
                       && updateCardsPackHandler(el._id, el.name);
                }

                return <React.Fragment key={el._id}>
                  <div>{el.name}</div>
                  <div>{el.cardsCount}</div>
                  <div>{data}</div>
                  <div />
                  <div>
                    <Button
                        disabled={loading || userId !== el.user_id}
                        onClick={onDeletedCardsPackClick}
                    >
                      del
                    </Button>
                    <Button
                        disabled={loading || userId !== el.user_id}
                        onClick={onUpdateCardsPackClick}
                    >
                      update
                    </Button>
                    <Link
                        to={!loading ? CARDS + '/' + el._id : '#'}
                        className={"link"}
                    >
                      cards
                    </Link>

                    {el.hasOwnProperty('cardsCount') && el.cardsCount > 0
                        ? <Link
                            to={!loading ? TRAIN + '/' + el._id : '#'}
                            className={"link"}>
                          train
                          </Link>
                        : 'train'
                    } </div>
                </React.Fragment>;
               }
             })}
  </div>
</div>
  );
};
