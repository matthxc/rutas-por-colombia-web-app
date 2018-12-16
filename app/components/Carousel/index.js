/**
 *
 * Carousel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// Components
import { Image, CenteredImage } from 'components/LazyImage';

// Styles
import { Container, Carousel } from './styles/Carousel';

/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-array-index-key */
class CarouselComponent extends React.Component {
  static defaultProps = {
    width: '100%',
    height: 'auto',
    centered: false,
    aspectRatio: '21:9',
    imageSource: 'external',
  };

  static propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    centered: PropTypes.bool,
    images: PropTypes.array.isRequired,
    aspectRatio: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    imageSource: PropTypes.string,
  };

  settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  renderImages = images =>
    images.map(({ _id, path }) => {
      if (this.props.centered) {
        return (
          <CenteredImage
            key={_id}
            src={path}
            source={this.props.imageSource}
            alt="Carousel Image"
          />
        );
      }
      return (
        <Image
          key={_id}
          src={path}
          source={this.props.imageSource}
          alt="Carousel Image"
        />
      );
    });

  render() {
    const {
      width,
      images,
      centered,
      className,
      style,
      imageSource,
      ...props
    } = this.props;
    let { height, aspectRatio } = this.props;
    let paddingTop = 0;
    if (!centered) {
      height = 'auto';
      aspectRatio = 'free';
    }
    if (aspectRatio !== 'free') {
      const aspectRatioNumbers = aspectRatio.split(':');
      paddingTop = `${(aspectRatioNumbers[1] / aspectRatioNumbers[0]) * 100}%`;
    }
    return (
      <Container
        width={width}
        height={height}
        aspectRatio={aspectRatio}
        paddingTop={paddingTop}
        className={className}
        style={style}
      >
        <Carousel width={width} height={height} {...this.settings} {...props}>
          {this.renderImages(images)}
        </Carousel>
      </Container>
    );
  }
}

export default CarouselComponent;
