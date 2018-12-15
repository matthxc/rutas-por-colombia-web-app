/**
 *
 * InlineLoader
 *
 */

import React from 'react';
import styled from 'styled-components';

// Ant
import Spin from 'antd/lib/spin';
import Icon from 'antd/lib/icon';

const Container = styled.div`
  text-align: center;
  background: transparent;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 0 20px;
  margin: 20px 0;
  width: 100%;
`;

const antIcon = (
  <Icon
    type="loading"
    style={{ fontSize: 32, width: '32px', height: '32px' }}
    spin
  />
);

const InlineLoader = () => (
  <Container>
    <Spin indicator={antIcon} />
  </Container>
);

export default InlineLoader;
