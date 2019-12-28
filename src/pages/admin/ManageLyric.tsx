import React, { FunctionComponent, useState, useEffect, ChangeEvent } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';

import { Lyric } from '../../api/types';
import { fetchResource, updateResource, createResource } from '../../api/utils';
import Container from '../../styled/Container';
import { Card, CardContent, CardAction } from '../../styled/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Loader from '../../components/Loader';

type MatchParams = {
  id: string;
};

const ManageLyric: FunctionComponent<RouteComponentProps<MatchParams>> = ({ match }) => {
  const [lyric, setLyric] = useState<Lyric>({} as Lyric);
  const [isLoading, setLoading] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  async function fetchLyric(): Promise<void> {
    setLoading(true);
    const resource = await fetchResource<Lyric>('lyrics', match.params.id);
    setLyric(resource);
    setLoading(false);
  }

  useEffect(() => {
    if (match.params.id) {
      fetchLyric();
    }
  }, []);

  function handleNameChange(e: ChangeEvent<HTMLInputElement>): void {
    setLyric({ ...lyric, name: e.target.value });
  }

  function handleTextChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    setLyric({ ...lyric, text: e.target.value });
  }

  async function handleSaveClick(): Promise<void> {
    let res = '';
    setLoading(true);
    if (match.params.id) {
      res = await updateResource<Lyric>('lyrics', match.params.id, lyric);
    } else {
      res = await createResource<Lyric>('lyrics', lyric);
    }
    setLoading(false);
    setShouldRedirect(true);
    window.alert(res);
  }

  return (
    <>
      {shouldRedirect && <Redirect to="/lyrics" />}
      <Container>
        {match.params.id ? <h3>Update Lyric</h3> : <h3>Create Lyric</h3>}
        <Loader isLoading={isLoading}>
          <div className="row">
            <div className="col s12 m4 offset-m4">
              <Card>
                <CardContent>
                  <Input
                    name="name"
                    type="text"
                    label="Name"
                    onChange={handleNameChange}
                    value={lyric.name}
                  />
                  <TextArea
                    name="text"
                    label="Text"
                    onChange={handleTextChange}
                    value={lyric.text}
                  />
                </CardContent>
                <CardAction>
                  <Button handleClick={handleSaveClick}>Save</Button>
                </CardAction>
              </Card>
            </div>
          </div>
        </Loader>
      </Container>
    </>
  );
};

export default ManageLyric;
