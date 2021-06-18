import { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';

type ValidationsType = {
  isEmail?: boolean
  minLength?: number
  isPassword?: boolean
  repeatPass?: boolean
}

const useValidation = (value: string, validations: ValidationsType) => {
  const [inputError, setInputError] = useState('');
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'isEmail':
          const reForMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (value.length === 0) {
            setInputError('Email is required');
          } else {
            reForMail.test(String(value).toLowerCase())
              ? setInputError('')
              : setInputError('Email address is invalid');
          }
          break;
        case 'isPassword':
          if (!value.length) {
            setInputError('Password is required');
          } else {
            const minLength = validations.minLength
              ? validations.minLength
              : 8;
            value.length < minLength
              ? setInputError('Password must be 8 or more characters')
              : setInputError('');
          }
          break;
        case 'repeatPass':
          if (!value.length) {
            setInputError('Password is required');
          } else if (inputError !== 'Passwords must be same') {
            setInputError('');
          }
      }
    }
  }, [value, validations, inputError]);

  useEffect(() => {
    if (inputError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [inputError]);

  return {
    setInputError,
    inputError,
    inputValid,
  };
};

export const useInput = (initialValue: string, validations: ValidationsType) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false); //выход из инпута
  const valid = useValidation(value, validations);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const onBlur = () => {
    setDirty(true);
  };

  return {
    setDirty,
    setValue,
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid,
  };
};
