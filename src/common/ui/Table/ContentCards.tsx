import React from 'react';
import './Table.scss';
import {Button} from 'src/common/ui/Button';
import {CardsType} from 'src/pages/cards/dal/CardsApi';

export type ContentCardsProps = {
  cards: Array<CardsType>
  loading: boolean
  page: number
  pageCount: number
  userId: string
  deletedCardHandler?: (cardId: string) => void
  updateCardHandler?: (_id: string, question: string, answer: string) => void
};

export const ContentCards: React.FC<ContentCardsProps> = ({
  cards,
  loading,
  page,
  pageCount,
  userId,
  deletedCardHandler,
  updateCardHandler
}) => {

return (
      <div className="table-sixth-column">
        <div className={"hGridContainer"}>
          {cards.length === 0 && !loading
              ? 'empty'
              : cards.slice((page - 1) * pageCount, page * pageCount)
                  .map((el) => {
                    const data = new Date(el.updated).toUTCString().substring(0, 22);
                    {
                      const onDeletedCardClick = () =>
                          deletedCardHandler
                          && deletedCardHandler(el._id);
                      const onUpdateCardClick = () =>
                          updateCardHandler
                          && updateCardHandler(el._id, el.question, el.answer);

                      return <React.Fragment key={el._id}>
                        <div>{el.question}</div>
                        <div>{el.answer}</div>
                        <div>{el.grade}</div>
                        <div>{data}</div>
                        <div/>
                        <div>
                          <Button
                              disabled={loading || userId !== el.user_id}
                              onClick={onDeletedCardClick}>
                            del
                          </Button>
                          <Button
                              disabled={loading || userId !== el.user_id}
                              onClick={onUpdateCardClick}>
                            update
                          </Button>
                        </div>
                      </React.Fragment>;
                    }
                  })}
        </div>
      </div>
  );
};
