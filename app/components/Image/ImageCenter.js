import React, { Component } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ImageLoader from './ImageLoader';

class ImageCenter extends Component {
  render() {
    const {
      loading,
      src,
      width,
      height,
      alt,
      itemProp,
      style,
      className,
    } = this.props;
    let vertical = false;
    if (this.container && !loading) {
      if (
        this.container.clientWidth / this.container.clientHeight <
        width / height
      ) {
        vertical = true;
      }
    }
    return (
      <div
        style={style}
        className={`image-centered image ${
          vertical ? 'vertical' : ''
        } ${className}`}
        ref={container => {
          this.container = container;
        }}
      >
        <div className="image-wrapper">
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
      </div>
    );
  }
}

ImageCenter.propTypes = {
  loading: PropTypes.bool,
  src: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  alt: PropTypes.string.isRequired,
  itemProp: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default ImageLoader(ImageCenter);
