import React, { FunctionComponent, useState, useEffect, ChangeEvent } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';

import { Member } from '../../api/types';
import { fetchResource, updateResource, createResource, uploadImage } from '../../api/utils';
import Button from '../../components/Button';
import Input from '../../components/Input';
import FileInput from '../../components/FileInput';
import Loader from '../../components/Loader';

const styles = {
  container: {
    marginBottom: '17vh',
  },
};

type MatchParams = {
  id: string;
};

const ManageMember: FunctionComponent<RouteComponentProps<MatchParams>> = ({ match }) => {
  const [member, setMember] = useState<Member>({
    id: '',
    name: '',
    instrument: '',
    info: '',
    image: '',
    imageNG: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  async function fetchMember(): Promise<void> {
    setLoading(true);
    const resource = await fetchResource<Member>('members', match.params.id);
    setMember(resource);
    setLoading(false);
  }

  useEffect(() => {
    if (match.params.id) {
      fetchMember();
    }
  }, []);

  function handleFormChange(e: ChangeEvent<HTMLInputElement>): void {
    setMember({ ...member, [e.target.name]: e.target.value });
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>): void {
    setSelectedFile(e.target.files[0]);
  }

  async function handleSaveClick(): Promise<void> {
    // TODO: validate
    setLoading(true);

    let res = '';
    let imageURL = '';
    let ngImageURL = '';

    if (selectedFile) {
      const image = new FormData();
      image.append('memberImage', selectedFile);
      try {
        const result = await uploadImage('members', member.name, image);
        imageURL = result.imageURL;
        ngImageURL = result.ngImageURL;
      } catch (error) {
        window.alert(error);
        return;
      }
    }

    if (imageURL && ngImageURL) {
      member.image = imageURL;
      member.imageNG = ngImageURL;
    }

    if (match.params.id) {
      res = await updateResource<Member>('members', match.params.id, member);
    } else {
      res = await createResource<Member>('members', member);
    }

    setLoading(false);
    setShouldRedirect(true);
    window.alert(res);
  }

  return (
    <>
      {shouldRedirect && <Redirect to="/members" />}
      <section style={styles.container}>
        {match.params.id ? <h3>Update Member</h3> : <h3>Create Member</h3>}
        <Loader isLoading={isLoading}>
          <div className="row">
            <div className="col s12 m4 offset-m4">
              <div className="card">
                <div className="card-content">
                  <Input
                    name="name"
                    type="text"
                    label="Name"
                    onChange={handleFormChange}
                    value={member.name}
                  />
                  <Input
                    name="instrument"
                    type="text"
                    label="Instrument"
                    onChange={handleFormChange}
                    value={member.instrument}
                  />
                  <Input
                    name="info"
                    type="text"
                    label="Info"
                    onChange={handleFormChange}
                    value={member.info}
                  />
                  <FileInput onChange={handleImageChange} />
                </div>
                <div className="card-action">
                  <Button handleClick={handleSaveClick}>Save</Button>
                </div>
              </div>
            </div>
          </div>
        </Loader>
      </section>
    </>
  );
};

export default ManageMember;
