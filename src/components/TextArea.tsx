import React, { ChangeEvent, useEffect } from 'react';

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
    // @ts-ignore
    M.textareaAutoResize(el);
  });

  return (
    <div className="input-field">
      <textarea id={name} className="materialize-textarea" onChange={onChange} value={value} />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}

export default TextArea;
