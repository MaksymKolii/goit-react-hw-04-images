import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export function ImagesGallery({ options, onClick }) {
  return (
    <Gallery>
      {options.map(({ id, smallImg, bigImg }) => {
        return (
          <ImageGalleryItem
            key={id}
            smallImg={smallImg}
            bigImg={bigImg}
            onClick={onClick}
          />
        );
      })}
    </Gallery>
  );
}
// ImagesGallery.propTypes = {
//   id: PropTypes.number,
//   smallImg: PropTypes.string,
// };
ImagesGallery.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func.isRequired,
};
