/**
 *
 * ImageLoader
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function(ImageView) {
  class ImageLoader extends Component {
    static defaultProps = {
      aws: false,
    };

    static propTypes = {
      alt: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      aws: PropTypes.bool,
    };

    state = {
      loading: true,
      src: '',
      width: 0,
      height: 0,
    };

    async componentWillMount() {
      this.loadImage(this.props.src);
    }

    async componentWillReceiveProps(nextProps) {
      if (this.props.src !== nextProps.src) {
        this.loadImage(nextProps.src);
      }
    }

    componentWillUnmount() {
      this.alive = false;
    }

    loadImage = async url => {
      await this.setState({
        loading: true,
      });
      let src = url;
      if (this.props.aws) {
        src = `https://s3-us-west-2.amazonaws.com/mdc-public-files/public/${url}`;
      }
      const image = new Image();
      image.src = src;
      const ref = this;
      image.onload = function load() {
        if ('naturalHeight' in this) {
          if (ref.alive) {
            ref.setState({
              loading: false,
              src,
              width: this.width,
              height: this.height,
            });
          }
        }
      };
    };

    alive = true;

    render() {
      return <ImageView {...this.props} {...this.state} />;
    }
  }

  return ImageLoader;
}
