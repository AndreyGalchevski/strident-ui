import React, { ReactElement } from 'react';

import Header from '../components/Header';

function Home(): ReactElement {
  return (
    <section>
      <Header title="Home" isAuthenticated={false} adminPath="/admin/home/new" />
      <br />
      <br />
      <br />
      <br />
      <h1>Under Construction</h1>
    </section>
  );
}

export default Home;
