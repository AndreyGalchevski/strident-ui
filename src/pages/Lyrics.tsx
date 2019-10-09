import React, { useEffect, useState } from 'react';

import { fetchResources } from '../api/utils';
import { Lyric } from '../api/types';

function Lyrics(): React.ReactElement {
  const [lyrics, setLyrics] = useState<Lyric[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchLyrics(): Promise<void> {
      setLoading(true);
      const resources = await fetchResources<Lyric>('lyrics');
      setLyrics(resources);
      setLoading(false);
    }

    fetchLyrics();
  }, []);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <section>
      <h3>Lyrics</h3>
      <div>
        {lyrics.map(lyric => (
          <div key={lyric._id}>
            <p>{lyric._id}</p>
            <p>{lyric.name}</p>
            <p>{lyric.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Lyrics;
