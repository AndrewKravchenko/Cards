import React, { FC } from 'react';

import s from './ErrorMessage.module.scss';
import { Button } from '../Button';

type PropsType = {
  clickHandler?: () => void;
};

export const ErrorMessage: FC<PropsType> = ({
  children,
  clickHandler
}) => {

  return (
    <div className={s.message}>
      <p>{children}</p>
      {clickHandler && (
        <Button small error onClick={clickHandler}>
          Close
        </Button>
      )}
    </div>
  );
};
