import React, { FC } from 'react';
import s from './Test.module.scss';
import { randomId } from 'src/utils/randomId';
import { ExamplesType } from 'src/pages/test/ui/TestContainer';

type PropsType = {
  examples: ExamplesType;
};

export const Test: FC<PropsType> = ({ examples }) => {
  return (
    <table className={s.table}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        {examples.map((item) => {
          const [title, [Example, props]] = item;

          return (
            <tr key={randomId()}>
              <td>{title}</td>
              <td>
                <Example {...props} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
