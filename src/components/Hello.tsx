import * as React from 'react';

export interface HelloProps {
  compiler: string;
  framework: string;
}

function Hello(props: HelloProps): React.ReactElement {
  const { compiler, framework } = props;
  return (
    <h1>
      Hello from {compiler} and {framework}!
    </h1>
  );
}

export default Hello;
