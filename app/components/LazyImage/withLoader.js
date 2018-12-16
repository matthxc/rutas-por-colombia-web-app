import React from 'react';
import PropTypes from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';

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
    };

    static propTypes = {
      src: PropTypes.string,
      alt: PropTypes.string.isRequired,
    };

    isMounted = false;

    constructor(props) {
      super(props);
      this.isMounted = true;
    }

    componentDidMount = () => {
      const { src } = this.props;
      if (src) {
        this.setState({ url: src });
      }
    };

    componentWillUnmount = () => {
      this.isMounted = false;
    };

    componentDidUpdate = prevProps => {
      const { src } = this.props;
      if (src) {
        if (src !== prevProps.src) {
          this.setState({ loading: true, url: src });
        }
      }
    };

    state = {
      loading: true,
      url: '',
    };

    onLoad = () => {
      this.setState({ loading: false });
    };

    render() {
      const { loading, url } = this.state;
      const { src, ...props } = this.props;
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
  }

  return ImageLoader;
};
