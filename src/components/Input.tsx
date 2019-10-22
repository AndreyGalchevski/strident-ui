import React, { ChangeEvent, useEffect } from 'react';

export interface TextInputProps {
  name: string;
  type: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
}

function TextInput(props: TextInputProps): React.ReactElement {
  const { name, type, label, onChange, value } = props;

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
}

export default TextInput;
