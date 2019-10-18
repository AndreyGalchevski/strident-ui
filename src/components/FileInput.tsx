import React, { ChangeEvent } from 'react';
import { ACCENT_COLOR } from '../utils/constants';

export interface FileInputPros {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function FileInput(props: FileInputPros): React.ReactElement {
  const { onChange } = props;

  return (
    <div className="file-field input-field">
      <div className="btn" style={{ backgroundColor: ACCENT_COLOR }}>
        <span>File</span>
        <input type="file" onChange={onChange} />
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text" />
      </div>
    </div>
  );
}

export default FileInput;
