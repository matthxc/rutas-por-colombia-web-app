import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

// Redux stuff
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';

// Semantic
import { Segment } from 'semantic-ui-react';

// Components
import Header from 'components/Header';

// Redux stuff
import { makeSelectTouristAttraction } from './selectors';
import { touristAttractionReducer } from './reducer';

// Styles
import { Drawer } from './styles/TouristAttraction';

/* eslint-disable react/prefer-stateless-function */
class TouristAttraction extends React.Component {
  static defaultProps = {
    visible: false,
    close: () => {},
  };

  static propTypes = {
    touristAttraction: PropTypes.object.isRequired,
    visible: PropTypes.bool,
    close: PropTypes.func,
  };

  render() {
    const { touristAttraction, visible } = this.props;

    console.log(touristAttraction);
    const { name, description } = touristAttraction;
    return (
      <Drawer
        title={
          <Header type="h3" uppercase>
            {name}
          </Header>
        }
        placement="right"
        onClose={this.props.close}
        visible={visible}
        destroyOnClose
        width="100%"
      >
        {isEmpty(touristAttraction) ? (
          <Segment basic padded="very">
            <Header type="h2" textAlign="center">
              Lo sentimos. Hubo un error al mostrar la información.
            </Header>
          </Segment>
        ) : (
          <p>{description}</p>
        )}
      </Drawer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  touristAttraction: makeSelectTouristAttraction(),
});

const withConnect = connect(mapStateToProps);

const withReducer = injectReducer({
  key: 'touristAttraction',
  reducer: touristAttractionReducer,
});

export default compose(
  withReducer,
  withConnect,
)(TouristAttraction);
