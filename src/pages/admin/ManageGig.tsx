import React, { FunctionComponent, useState, useEffect, ChangeEvent } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';

import { Gig } from '../../api/types';
import { fetchResource, updateResource, createResource, uploadImage } from '../../api/utils';
import { formatDate, formatTime } from '../../utils/general';
import Container from '../../styled/Container';
import { Card, CardContent, CardAction } from '../../styled/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import FileInput from '../../components/FileInput';
import Loader from '../../components/Loader';

type MatchParams = {
  id: string;
};

const ManageGig: FunctionComponent<RouteComponentProps<MatchParams>> = ({ match }) => {
  const [gig, setGig] = useState<Gig>({
    id: '',
    name: '',
    venue: '',
    address: '',
    city: '',
    date: new Date(),
    fbEvent: '',
    image: '',
    imageNG: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    async function fetchVideo(): Promise<void> {
      setLoading(true);
      const resource = await fetchResource<Gig>('gigs', match.params.id);
      setGig({ ...resource, date: new Date(resource.date) });
      setLoading(false);
    }

    if (match.params.id) {
      fetchVideo();
    }
  }, []);

  function handleTextInputChange(e: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setGig({ ...gig, [name]: value });
  }

  function handleDateInputChange(e: ChangeEvent<HTMLInputElement>): void {
    const { value } = e.target;
    setGig({ ...gig, date: new Date(value) });
  }

  function handleTimeInputChange(e: ChangeEvent<HTMLInputElement>): void {
    const { value } = e.target;
    setGig({ ...gig, date: new Date(`${formatDate(gig.date)} ${value}`) });
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>): void {
    setSelectedFile(e.target.files[0]);
  }

  async function handleSaveClick(): Promise<void> {
    setLoading(true);

    let res = '';
    let imageURL = '';
    let ngImageURL = '';

    if (selectedFile) {
      const image = new FormData();
      image.append('gigImage', selectedFile);
      try {
        const fileName = `${gig.venue.replace(/ /g, '')}-${formatDate(gig.date)}`;
        const result = await uploadImage('gigs', fileName, image);
        imageURL = result.imageURL;
        ngImageURL = result.ngImageURL;
      } catch (error) {
        window.alert(error);
        return;
      }
    }

    if (imageURL && ngImageURL) {
      gig.image = imageURL;
      gig.imageNG = ngImageURL;
    }

    if (match.params.id) {
      res = await updateResource<Gig>('gigs', match.params.id, gig);
    } else {
      res = await createResource<Gig>('gigs', gig);
    }

    setLoading(false);
    setShouldRedirect(true);
    window.alert(res);
  }

  return (
    <>
      {shouldRedirect && <Redirect to="/gigs" />}
      <Container>
        {match.params.id ? <h3>Update Gig</h3> : <h3>Create Gig</h3>}
        <Loader isLoading={isLoading}>
          <div className="row">
            <div className="col s12 m4 offset-m4">
              <Card>
                <CardContent>
                  <Input
                    name="name"
                    type="text"
                    label="Name"
                    onChange={handleTextInputChange}
                    value={gig.name}
                  />
                  <Input
                    name="venue"
                    type="text"
                    label="Venue"
                    onChange={handleTextInputChange}
                    value={gig.venue}
                  />
                  <Input
                    name="address"
                    type="text"
                    label="Address"
                    onChange={handleTextInputChange}
                    value={gig.address}
                  />
                  <Input
                    name="city"
                    type="text"
                    label="City"
                    onChange={handleTextInputChange}
                    value={gig.city}
                  />
                  <Input
                    name="date"
                    type="date"
                    label="Date"
                    onChange={handleDateInputChange}
                    value={formatDate(gig.date)}
                  />
                  <Input
                    name="date"
                    type="time"
                    label="Time"
                    onChange={handleTimeInputChange}
                    value={formatTime(gig.date)}
                  />
                  <Input
                    name="fbEvent"
                    type="text"
                    label="Facebook Event"
                    onChange={handleTextInputChange}
                    value={gig.fbEvent}
                  />
                  <FileInput onChange={handleImageChange} />
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

export default ManageGig;
