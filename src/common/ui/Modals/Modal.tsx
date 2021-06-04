import React, { FC } from 'react';
import s from './Modal.module.scss';

type PropsType = {
  deactivateEditMode: () => void
}
export const  Modal: FC<PropsType> = ({
  deactivateEditMode,
  children
}) => {

  return <div onClick={ deactivateEditMode} className={s.packsModal}>
    <form onClick={(e) =>
      e.stopPropagation()} className={s.form}>
    {children}
    </form>
  </div>
}
