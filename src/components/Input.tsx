import React, { FunctionComponent, ChangeEvent, useEffect } from 'react';

export interface Props {
  name: string;
  type: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
}

const TextInput: FunctionComponent<Props> = ({ name, type, label, onChange, value }) => {
  useEffect(() => {
    // @ts-ignore
    M.updateTextFields();
  });

  return (
    <div className="input-field">
      <input id={name} name={name} type={type} onChange={onChange} value={value} />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default TextInput;
