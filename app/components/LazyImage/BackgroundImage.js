import React from 'react';
import PropTypes from 'prop-types';

// Components
import withLoader from './withLoader';

// Styles
import { Container } from './styles/BackgroundImage';

const BackgroundImage = ({ className, id, style, src, children }) => (
  <Container className={className} id={id} style={style} src={src}>
    {children}
  </Container>
);

BackgroundImage.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  src: PropTypes.string.isRequired,
};

export default withLoader(BackgroundImage);
