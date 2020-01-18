import React, { FunctionComponent, ChangeEvent } from 'react';

import { capitalize } from '../utils/general';

export interface Props {
  name: string;
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
}

const TextInput: FunctionComponent<Props> = ({ name, type, onChange, value }) => {
  return (
    <input
      id={name}
      name={name}
      type={type}
      onChange={onChange}
      value={value}
      placeholder={capitalize(name)}
    />
  );
};

export default TextInput;
