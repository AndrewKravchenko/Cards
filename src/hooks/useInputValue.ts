import { ChangeEvent, useState } from 'react';
import { ReturnUseInputValueType } from './types';

export const useInputValue =
  <T extends string | number | undefined>(initValue: T): ReturnUseInputValueType<T> => {
    const [value, setValue] = useState<T>(initValue);

    const onChangeHandler =
      (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = typeof value === 'string'
          ? event.currentTarget.value
          : +event.currentTarget.value;
        setValue(newValue as T);
      };

    return [value, setValue, onChangeHandler];
  };
