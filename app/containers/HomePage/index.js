/**
 *
 * HomePage
 *
 */

import React from 'react';

// Components
import { Map } from '../Map';
import { SearchModal } from '../Search';

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {
  render() {
    return (
      <div>
        <SearchModal />
        <Map />
      </div>
    );
  }
}

export default HomePage;
