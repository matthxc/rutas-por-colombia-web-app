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
import TouristAttraction from '../TouristAttraction';

const Container = styled.div`
  position: relative;
  height: calc(100vh - 80px);
`;

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {
  state = {
    drawerVisible: false,
  };

  openTouristAttractionDrawer = () => {
    this.setState({
      drawerVisible: true,
    });
  };

  closeTouristAttractionDrawer = () => {
    this.setState({
      drawerVisible: false,
    });
  };

  render() {
    const { drawerVisible } = this.state;
    return (
      <Container>
        <SearchModal />
        <Map viewTouristAttraction={this.openTouristAttractionDrawer} />
        <TouristAttraction
          visible={drawerVisible}
          close={this.closeTouristAttractionDrawer}
        />
      </Container>
    );
  }
}

export default HomePage;
