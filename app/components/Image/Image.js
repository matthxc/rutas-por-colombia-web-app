import React from 'react';
import PropTypes from 'prop-types';
import { Dimmer, Loader } from 'semantic-ui-react';
import ImageLoader from './ImageLoader';

const ImageView = ({
  loading,
  src,
  width,
  height,
  alt,
  itemProp,
  style,
  className,
}) => (
  <div className={`image-wrapper image ${className}`} style={style}>
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={{ opacity: `${src ? 1 : 0}` }}
      itemProp={itemProp || ''}
    />
    <div className={`image-component-loader ${loading ? 'loading' : ''}`}>
      <Dimmer.Dimmable blurring dimmed={loading}>
        <Dimmer active={loading} inverted>
          <Loader size="large" />
        </Dimmer>
      </Dimmer.Dimmable>
    </div>
  </div>
);

ImageView.propTypes = {
  loading: PropTypes.bool,
  src: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  alt: PropTypes.string.isRequired,
  itemProp: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default ImageLoader(ImageView);
