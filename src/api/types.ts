export interface Credentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  err: string;
}

export interface TokenClaims {
  username: string;
  exp: number;
}

export interface Member {
  id: string;
  name: string;
  instrument: string;
  info: string;
  image: string;
}

export interface Song {
  id: string;
  name: string;
  album: string;
  url: string;
}

export interface Video {
  id: string;
  name: string;
  url: string;
  date: Date;
}

export interface Gig {
  id: string;
  venue: string;
  address: string;
  date: Date;
  fbEvent: string;
  image: string;
}

export interface Lyric {
  id: string;
  name: string;
  text: string;
}
