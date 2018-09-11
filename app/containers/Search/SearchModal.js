import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';

// Antd
import Modal from 'antd/lib/modal';
import 'antd/lib/modal/style/index.less';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.less';
import message from 'antd/lib/message';

// Semantic
import { Segment, Header, Select } from 'semantic-ui-react';

// Redux
import { makeSelectRouteResults } from '../Map/selectors';
import { routeResultsReducer } from '../Map/reducer';
import { searchRoute } from './actions';
import { resetRouteResults } from '../Map/actions';

// Components
import SearchInput from './SearchInput';
import ResultsBox from './ResultsBox';

const MainContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 999;
  width: 100%;
  max-width: 350px;
`;

const ContainerModal = styled(Modal)`
  & .ant-modal-body {
    background-color: #303030;
  }
  & .ant-modal-close-x {
    color: white;
  }
`;

const Selector = styled(Select)`
  &.ui.selection.dropdown {
    display: inline-block;
    border-radius: 0;
    border-top: none;
    border-left: none;
    border-right: none;
    background-color: transparent;
    color: white;
    border-color: white;
  }
`;

const categoryOptions = [
  { key: 0, value: 0, text: 'I' },
  { key: 1, value: 1, text: 'II' },
  { key: 2, value: 2, text: 'III' },
  { key: 3, value: 3, text: 'IV' },
  { key: 4, value: 4, text: 'V' },
];

class SearchModal extends React.PureComponent {
  static propTypes = {
    searchRoute: PropTypes.func.isRequired,
    routeResults: PropTypes.object.isRequired,
    resetRouteResults: PropTypes.func.isRequired,
  };

  state = {
    visible: false,
    categoryValue: 0,
  };

  showModal = () => {
    this.props.resetRouteResults();
    this.setState({
      visible: true,
    });
  };

  closeModal = () => {
    this.setState({
      visible: false,
    });
  };

  handleCategoryChange = (e, { value }) => {
    this.setState({ categoryValue: value });
  };

  searchRoute = () => {
    const { categoryValue, locationFrom, locationTo } = this.state;
    if (!isEmpty(locationFrom) && !isEmpty(locationTo)) {
      this.closeModal();
      this.props.searchRoute({
        locationFrom: locationFrom.coordinates,
        locationTo: locationTo.coordinates,
        category: categoryValue,
      });
    } else {
      message.error(
        'Recuerda llenar todos los campos antes de hacer la búsqueda',
        4,
      );
    }
  };

  render() {
    const { visible, categoryValue, locationFrom, locationTo } = this.state;
    const { routeResults } = this.props;
    return (
      <MainContainer>
        <ResultsBox
          locationFrom={locationFrom}
          locationTo={locationTo}
          category={categoryValue}
          routeResults={routeResults}
        />
        <Button type="primary" block onClick={this.showModal}>
          Nueva búsqueda
        </Button>
        <ContainerModal
          visible={visible}
          title={null}
          onCancel={this.closeModal}
          footer={null}
          destroyOnClose
          width="80%"
        >
          <Segment basic padded="very" textAlign="center">
            <Header as="h2" inverted>
              <span>Quiero conocer la ruta de{`  `}</span>
              <SearchInput
                onSelect={location => {
                  this.setState({ locationFrom: location });
                }}
              />
              <span>
                {`  `}a{`  `}
              </span>
              <SearchInput
                onSelect={location => {
                  this.setState({ locationTo: location });
                }}
              />
              <span>
                {`  `}, en un vehículo categoría{`  `}
              </span>
              <Selector
                options={categoryOptions}
                compact
                onChange={this.handleCategoryChange}
                value={categoryValue}
              />
            </Header>
          </Segment>
          <Segment basic textAlign="center">
            <Button type="primary" onClick={this.searchRoute} size="large">
              Buscar ruta
            </Button>
          </Segment>
        </ContainerModal>
      </MainContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  routeResults: makeSelectRouteResults(),
});

const mapDispatchToProps = {
  searchRoute,
  resetRouteResults,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'routeResults',
  reducer: routeResultsReducer,
});

export default compose(
  withReducer,
  withConnect,
)(SearchModal);
