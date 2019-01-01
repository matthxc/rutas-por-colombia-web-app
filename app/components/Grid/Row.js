import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Ant
import AntRow from 'antd/lib/row';

import Col from './Col';

const WrapperAntRow = ({ padded, verticalGutter, divided, ...props }) => (
  <AntRow {...props} />
);

const Row = styled(WrapperAntRow)`
  &&& {
    ${Col} {
      ${props =>
        props.padded &&
        `
        padding-top: 6px;
        padding-bottom: 6px;
      `}
      ${props =>
        props.verticalGutter &&
        `
        padding-top: ${props.verticalGutter / 2}px;
        padding-bottom: ${props.verticalGutter / 2}px;
      `}
      ${props =>
        props.divided &&
        `
        color: inherit;
        border-right: 1px solid ${props.theme.textColor};
        &:last-child {
          border-right: none;
        }
      `}
    }
  }
`;

Row.defaultProps = {
  padded: false,
  verticalGutter: 0,
  divided: false,
};

Row.propTypes = {
  padded: PropTypes.bool,
  verticalGutter: PropTypes.number,
  divided: PropTypes.bool,
};

export default Row;
