import React from 'react';
import './Table.scss';
import {CardPacksType} from 'src/pages/packs/bll/PacksReducer';
import {CardsType} from 'src/pages/cards/dal/CardsApi';
import {ContentPacks} from "./ContentPacks";
import {ContentCards} from "./ContentCards";

export type TableProps = {
  header: Array<string | JSX.Element>
  packs?: Array<CardPacksType>
  cards?: Array<CardsType>
  loading: boolean
  page: number
  pageCount: number
  userId: string
  updateCardsPackHandler?: (cardsPackId: string, cardsPackName: string) => void
  deletedCardsPackHandler?: (cardsPackId: string) => void
  deletedCardHandler?: (cardId: string) => void
  updateCardHandler?: (_id: string, question: string, answer: string) => void
};

export const Table: React.FC<TableProps> = ({
  header,
  cards,
  packs,
  loading,
  page,
  pageCount,
  userId,
  updateCardsPackHandler,
  deletedCardsPackHandler,
  deletedCardHandler,
  updateCardHandler
}) => {

  return (<div className={"table"}>
        <div className={header.length === 5
            ? "table-fifth-column"
            :"table-sixth-column"}
        >
          <div className={"gridHeaderTable"}>
            {header.map((el, index) => {

              return <React.Fragment key={index}>
                <div>{el}</div>
              </React.Fragment>;
            })}
          </div>
        </div>
        {
          header.length === 5 &&
        <ContentPacks
            packs={packs? packs:[]}
            loading={loading}
            page={page}
            pageCount={pageCount}
            userId={userId}
            updateCardsPackHandler={updateCardsPackHandler}
            deletedCardsPackHandler={deletedCardsPackHandler}
        />
          }
          {
            header.length === 6 &&
            <ContentCards
                cards={cards ? cards:[]}
                loading={loading}
                page={page}
                pageCount={pageCount}
                userId={userId}
                updateCardHandler={updateCardHandler}
                deletedCardHandler={deletedCardHandler}
            />
          }
      </div>
  );
};
