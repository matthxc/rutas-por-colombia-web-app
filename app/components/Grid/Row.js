import React from 'react';
import styled from 'styled-components';

// Ant
import AntRow from 'antd/lib/row';

import Col from './Col';

const WrapperAntRow = ({ padded, ...props }) => <AntRow {...props} />;

export default styled(WrapperAntRow)`
  &&& {
    ${Col} {
      ${props =>
        props.padded &&
        `
        padding-top: 6px;
        padding-bottom: 6px;
      `}
    }
  }
`;
