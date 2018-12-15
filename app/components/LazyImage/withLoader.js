import React from 'react';
import PropTypes from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';
import { Storage } from 'aws-amplify';

// Antd
import Spin from 'antd/lib/spin';
import Icon from 'antd/lib/icon';

// Styles
import { LoaderContainer } from './styles/ImageLoader';

const antIcon = (
  <Icon
    type="loading"
    style={{ fontSize: 64, width: '64px', height: '64px' }}
    spin
  />
);

export default Component => {
  class ImageLoader extends React.Component {
    static defaultProps = {
      src: null,
      s3Key: null,
    };

    static propTypes = {
      src: PropTypes.string,
      alt: PropTypes.string.isRequired,
      s3Key: PropTypes.string,
    };

    isMounted = false;

    constructor(props) {
      super(props);
      this.isMounted = true;
    }

    componentDidMount = () => {
      const { src, s3Key } = this.props;
      if (src) {
        this.setState({ url: src });
      } else if (s3Key) {
        this.getS3();
      }
    };

    componentWillUnmount = () => {
      this.isMounted = false;
    };

    componentDidUpdate = prevProps => {
      const { src, s3Key } = this.props;
      if (src) {
        if (src !== prevProps.src) {
          this.setState({ loading: true, url: src });
        }
      } else if (s3Key) {
        if (s3Key !== prevProps.s3Key) {
          this.getS3();
        }
      }
    };

    getS3 = async () => {
      this.setState({ fetchingAWSFile: true, loading: true });
      try {
        const url = await Storage.get(this.props.s3Key);
        if (this.isMounted) {
          this.setState({ url, fetchingAWSFile: false });
        }
      } catch (error) {
        throw error;
      }
    };

    state = {
      loading: true,
      fetchingAWSFile: false,
      url: '',
    };

    onLoad = () => {
      this.setState({ loading: false });
    };

    render() {
      const { loading, url, fetchingAWSFile } = this.state;
      const { src, s3Key, ...props } = this.props;
      if (src || (!src && !s3Key)) {
        return (
          <React.Fragment>
            <CSSTransition
              in={!loading}
              timeout={300}
              classNames="fade"
              mountOnEnter
              unmountOnExit
            >
              <Component {...props} src={url} />
            </CSSTransition>
            {url && loading && (
              <img
                src={url}
                alt={this.props.alt || ''}
                style={{ display: 'none' }}
                onLoad={this.onLoad}
              />
            )}
            {loading && (
              <LoaderContainer>
                <Spin indicator={antIcon} />
              </LoaderContainer>
            )}
          </React.Fragment>
        );
      }
      return (
        <React.Fragment>
          <CSSTransition
            in={!loading}
            timeout={300}
            classNames="fade"
            mountOnEnter
            unmountOnExit
          >
            <Component {...props} src={url} />
          </CSSTransition>
          {url && loading && !fetchingAWSFile && (
            <img
              src={url}
              alt={this.props.alt || ''}
              style={{ display: 'none' }}
              onLoad={this.onLoad}
            />
          )}
          {loading || fetchingAWSFile ? (
            <LoaderContainer>
              <Spin indicator={antIcon} />
            </LoaderContainer>
          ) : (
            []
          )}
        </React.Fragment>
      );
    }
  }

  return ImageLoader;
};
