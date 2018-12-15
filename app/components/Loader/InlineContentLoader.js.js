import React from 'react';
import PropTypes from 'prop-types';

// Components
import InlineLoader from './InlineLoader';

const InlineContentLoader = ({ loading, state, children }) => {
  if (!loading && state === 'SUCCESS') {
    return children;
  }
  return <InlineLoader />;
};

InlineContentLoader.defaultProps = {
  loading: false,
  state: 'PENDING',
};

InlineContentLoader.propTypes = {
  loading: PropTypes.bool,
  state: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default InlineContentLoader;
