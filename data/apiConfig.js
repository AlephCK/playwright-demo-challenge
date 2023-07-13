import md5 from 'blueimp-md5';

const date = new Date();

export const apiData = {
  timeStamp: date.getTime(),
  publicKey: process.env.MARVEL_PUBLIC_KEY,
  privateKey: process.env.MARVEL_PRIVATE_KEY,
  limit: 100,
  comicSeries: 'X-Man',
  characterName: 'Spider-Man'
};

export const hash = {
  md5Hash: md5(apiData.timeStamp + apiData.privateKey + apiData.publicKey)
};