import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

// Redux stuff
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';

// Semantic
import { Segment, Divider } from 'semantic-ui-react';

// Components
import Header from 'components/Header';
import Carousel from 'components/Carousel';
import { Row, Col } from 'components/Grid';
import Tag from 'components/Tag';

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

  renderActivities = activities =>
    activities.map((activity, counter) => (
      <Tag color="#0052b4" key={counter}>
        {activity}
      </Tag>
    ));

  render() {
    const { touristAttraction, visible } = this.props;
    if (isEmpty(touristAttraction)) {
      return (
        <Drawer
          title="Error"
          placement="right"
          onClose={this.props.close}
          visible={visible}
          destroyOnClose
          width="100%"
        >
          <Segment basic padded="very">
            <Header type="h2" textAlign="center">
              Lo sentimos. Hubo un error al mostrar la información.
            </Header>
          </Segment>
        </Drawer>
      );
    }
    console.log(touristAttraction);
    const { name, description, activities, images, phone } = touristAttraction;
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
        <React.Fragment>
          <Carousel centered images={images} imageSource="api" />
          <Segment basic>
            <Row gutter={24} padded>
              <Col xs={24} md={12}>
                <Header type="h4" underline>
                  Actividades
                </Header>
                <p>{this.renderActivities(activities)}</p>
              </Col>
              <Col xs={24} md={12}>
                <Header type="h4" underline content="Número de contacto" />
                <p> {phone}</p>
              </Col>
            </Row>
            <Divider hidden />
            <Header type="h4" underline>
              Descripción
            </Header>
            <p>{description}</p>
          </Segment>
        </React.Fragment>
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
