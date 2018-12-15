/**
 *
 * ComponentLoader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

// Custom Loader
import { PageLoader } from 'components/Loader';

class ComponentLoader extends React.PureComponent {
  state = {
    animationEnds: false,
  };

  componentDidMount = () => {
    if (!this.props.loading) {
      this.setState({ animationEnds: true });
    }
  };

  render() {
    const { Component, loading, ownProps } = this.props;
    const { animationEnds } = this.state;
    return (
      <div>
        <CSSTransition
          in={loading}
          timeout={300}
          classNames="fade"
          mountOnEnter
          unmountOnExit
          onExited={() => {
            this.setState({ animationEnds: true });
          }}
        >
          <PageLoader />
        </CSSTransition>
        {!loading && animationEnds && <Component {...ownProps} />}
      </div>
    );
  }
}
ComponentLoader.defaultProps = {
  Component: null,
};

ComponentLoader.propTypes = {
  Component: PropTypes.any,
  loading: PropTypes.bool.isRequired,
  ownProps: PropTypes.object.isRequired,
};

export default ComponentLoader;
