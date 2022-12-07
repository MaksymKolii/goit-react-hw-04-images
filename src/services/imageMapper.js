export const imagesMapper = array => {
  return array.map(({ id, webformatURL: smallImg, largeImageURL: bigImg }) => ({
    id,
    smallImg,
    bigImg,
  }));
};
