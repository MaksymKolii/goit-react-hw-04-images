import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export class ImagesGallery extends Component {
  render() {
    return (
      <Gallery>
        {this.props.options.map(({ id, smallImg, bigImg }) => {
          return (
            <ImageGalleryItem
              key={id}
              smallImg={smallImg}
              bigImg={bigImg}
              onClick={this.props.onClick}
            />
          );
        })}
      </Gallery>
    );
  }
}
// ImagesGallery.propTypes = {
//   id: PropTypes.number,
//   smallImg: PropTypes.string,
// };
ImagesGallery.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func.isRequired,
};
