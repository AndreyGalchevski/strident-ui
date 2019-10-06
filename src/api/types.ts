export interface Member {
  _id: string;
  name: string;
  instrument: string;
  info: string;
  image: string;
}

export interface Song {
  _id: string;
  name: string;
  url: string;
}

export interface Video {
  _id: string;
  name: string;
  url: string;
  date: string;
}

export interface Gig {
  _id: string;
  venue: string;
  address: string;
  date: string;
  hour: string;
  fbEvent: string;
  image: string;
}

export interface Lyric {
  _id: string;
  name: string;
  text: string;
}
