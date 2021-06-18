import React, { FC, ElementType } from 'react';
import { Test } from './Test';
import { Button } from 'src/common/ui/Button';
import { Select } from 'src/common/ui/Select';
import { Preloader } from 'src/common/ui/Preloader';
import { InputText } from 'src/common/ui/InputText';
import { unCamelCase } from 'src/utils/textTransform';
import { LinkNative } from 'src/common/ui/LinkNative';
import { InputRadio } from 'src/common/ui/InputRadio';
import { ErrorMessage } from 'src/common/ui/ErrorMessage';
import { InputCheckbox } from 'src/common/ui/InputCheckbox';

const exampleLibrary: ExampleLibraryType = {
  preloader: [Preloader, { text: 'Loading' }],
  errorMessage: [
    ErrorMessage,
    { children: 'Error message', clickHandler: () => {} },
  ],
  link: [LinkNative, { href: '/', children: 'Hover me' }],
  button: [Button, { children: 'Click me' }],
  buttonError: [Button, { children: 'Error', error: true }],
  inputText: [InputText, { placeholder: 'Write here' }],
  inputEmail: [InputText, { type: 'email', placeholder: 'Email' }],
  inputPassword: [InputText, { type: 'password', placeholder: 'Password' }],
  inputTextError: [InputText, { error: 'an error', placeholder: 'Write here' }],
  inputCheckbox: [InputCheckbox, { children: 'Check me' }],
  inputRadio: [
    InputRadio,
    {
      options: ['React', 'Redux', 'Typescript'],
      name: 'skills',
      value: 'React',
    },
  ],
  select: [
    Select,
    { options: ['React', 'Redux', 'Typescript'], value: 'Redux' },
  ],
};

const examples: ExamplesType = Object.entries( exampleLibrary)
    .map(([title, example]) =>
        [unCamelCase(title), example]);

export const TestContainer: FC = () => {
  return <Test examples={examples} />;
};

type ExampleType = [ElementType, Record<string, unknown>];
type ExampleLibraryType = Record<string, ExampleType>;
export type ExamplesType = [string, ExampleType][];
