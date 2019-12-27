import React, { FunctionComponent, ChangeEvent, useEffect } from 'react';

export interface Props {
  name: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}

const TextArea: FunctionComponent<Props> = ({ name, label, onChange, value }) => {
  useEffect(() => {
    const el = document.querySelector(`#${name}`);
    // @ts-ignore
    M.textareaAutoResize(el);
  });

  return (
    <div className="input-field">
      <textarea id={name} className="materialize-textarea" onChange={onChange} value={value} />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default TextArea;
