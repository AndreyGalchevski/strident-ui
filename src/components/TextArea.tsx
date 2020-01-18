import React, { FunctionComponent, ChangeEvent } from 'react';
import { capitalize } from '../utils/general';

export interface Props {
  name: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}

const TextArea: FunctionComponent<Props> = ({ name, onChange, value }) => {
  return <textarea id={name} onChange={onChange} value={value} placeholder={capitalize(name)} />;
};

export default TextArea;
