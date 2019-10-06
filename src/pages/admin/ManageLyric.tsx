import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Lyric } from '../../api/types';
import { fetchResource } from '../../api/utils';

function ManageLyric(props: RouteComponentProps): React.ReactElement {
  const { match } = props;
  const [lyric, setLyric] = useState<Lyric>({} as Lyric);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchLyric(): Promise<void> {
      setLoading(true);
      const resource = await fetchResource<Lyric>('lyrics', match.params.id);
      setLyric(resource);
      setLoading(false);
    }

    fetchLyric();
  }, []);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <section>
      <h1>Manage Lyric</h1>
      <div>
        <p>{lyric._id}</p>
        <p>{lyric.name}</p>
        <p>{lyric.text}</p>
      </div>
    </section>
  );
}

export default ManageLyric;
