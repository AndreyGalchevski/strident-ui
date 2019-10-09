import React, { useState, useEffect, ChangeEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Lyric } from '../../api/types';
import { fetchResource, updateResource, createResource } from '../../api/utils';

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

    if (match.params.id) {
      fetchLyric();
    }
  }, []);

  function handleFormChange(e: ChangeEvent<HTMLInputElement>): void {
    setLyric({ ...lyric, [e.target.name]: e.target.value });
  }

  async function handleSaveClick(): Promise<void> {
    let res = '';
    setLoading(true);
    if (match.params.id) {
      res = await updateResource<Lyric>('lyrics', match.params.id, lyric);
    } else {
      res = await createResource<Lyric>('lyrics', lyric);
      setLyric({} as Lyric);
    }
    setLoading(false);
    window.alert(res);
  }

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <section>
      {match.params.id ? <h3>Update Lyric</h3> : <h3>Create Lyric</h3>}
      <div>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleFormChange}
            value={lyric.name}
          />
        </div>
        <div>
          <input
            type="text"
            name="text"
            placeholder="Text"
            onChange={handleFormChange}
            value={lyric.text}
          />
        </div>
        <button type="button" onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </section>
  );
}

export default ManageLyric;
