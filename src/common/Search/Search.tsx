import React, { ChangeEvent, FC } from 'react';
import s from './Search.module.scss';
import { InputText } from '../ui/InputText';

type PropsType = {
  loading: boolean
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void
}
export const Search: FC<PropsType> = ({
  loading,
  handleSearch,
  children
}) => {

  return (
    <div>
      <InputText className={s.search}
             type='text'
             name='search'
             onChange={handleSearch}
             disabled={loading}
             placeholder={'Search pack'}
      />
      {children}
    </div>
  );
};
