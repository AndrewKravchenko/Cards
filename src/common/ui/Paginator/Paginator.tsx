import React, { ChangeEvent } from 'react';
import s from './Paginator.module.scss';

export const Pagination = ({
  totalPages,
  page,
  handleChangePage,
  pageCount,
  setPageCount
}: PaginatorType) => {
  let pattern = null;

  switch (true) {
    case totalPages < 7:
      pattern = [...new Array(totalPages)].map((_, i) => i + 1);
      break;
    case page < 4:
      pattern = [1, 2, 3, 4, 5, '...', totalPages];
      break;
    case page > totalPages - 4:
      pattern = [1, '...', totalPages - 4, totalPages - 3,
                totalPages - 2, totalPages - 1, totalPages];
      break;
    default:
      pattern = [1, '...', page - 1, page, page + 1, '...', totalPages];
  }

  function changeNumber(n: number) {
    if (n > 0 && n <= totalPages) {
      handleChangePage(n);
    }
  }

  const changeWidth = (e: ChangeEvent<HTMLInputElement>) => {
    if (!(+e.currentTarget.value < 0)
        && +e.currentTarget.value !== 0
        && +e.currentTarget.value <= 25)
    {
      const newPageCount = parseInt(e.currentTarget.value
        .replace(/\+|\-/ig, ''), 10);
      changeNumber(Math.floor(pageCount * page / newPageCount))
      setPageCount(newPageCount);
    }
  };
  return (
    <div className={s.paginatorBlock}>
      <div className={s.paginator}>
        <button
            disabled={page <= 1}
            onClick={() => changeNumber(page - 1)}
        >
          {'<'}
        </button>
        {pattern.map((label, index) => (
          <button
              key={index}
              className={page === label
                  ? s.active
                  : ''
              }
              onClick={() => changeNumber(+label)}
          >
            {label}
          </button>
        ))}
        <button
            disabled={page >= totalPages}
            onClick={() => changeNumber(page + 1)}
        >
          {'>'}
        </button>
      </div>
      <div className={s.paginatorItems}>
        <span>Items per Page: </span>
        <input
          className={s.inputPage}
          type='number'
          onChange={changeWidth}
          value={pageCount}
        />
      </div>
    </div>
  );
};

type PaginatorType = {
  totalPages: number
  pageCount: number
  page: number
  handleChangePage: (n: number) => void
  setPageCount: (n: number) => void
}
