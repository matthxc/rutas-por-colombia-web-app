import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Span = ({ className, color, ...props }) => (
  <span {...props} className={className} />
);

const Subtitle = styled(Span)`
  display: block;
  font-weight: 400;
  font-size: 0.9em;
  color: ${props => (props.color ? props.theme[props.color] : 'inherit')};
`;

Subtitle.defaultProps = {
  color: null,
};

Subtitle.propTypes = {
  color: PropTypes.string,
};

export default Subtitle;
