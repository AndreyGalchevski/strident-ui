import React, { ChangeEvent, useEffect } from 'react';
import { textareaAutoResize } from 'materialize-css';

export interface TextAreaProps {
  name: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}

function TextArea(props: TextAreaProps): React.ReactElement {
  const { name, label, onChange, value } = props;

  useEffect(() => {
    const el = document.querySelector(`#${name}`);
    textareaAutoResize(el);
  });

  return (
    <div className="input-field">
      <textarea id={name} className="materialize-textarea" onChange={onChange} value={value} />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}

export default TextArea;
