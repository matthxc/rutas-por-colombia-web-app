/**
 *
 * HomePage
 *
 */

import React from 'react';
import styled from 'styled-components';

// Components
import { Map } from '../Map';
import { SearchModal } from '../Search';

const Container = styled.div`
  position: relative;
  height: calc(100vh - 80px);
`;

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {
  render() {
    return (
      <Container>
        <SearchModal />
        <Map />
      </Container>
    );
  }
}

export default HomePage;
