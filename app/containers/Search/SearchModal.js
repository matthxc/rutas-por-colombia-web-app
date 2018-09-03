import React from 'react';
import styled from 'styled-components';

// Antd
import Modal from 'antd/lib/modal';
import 'antd/lib/modal/style/index.css';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';

// Semantic
import { Segment, Header } from 'semantic-ui-react';

// Components
import SearchInput from './SearchInput';

const ContainerModal = styled(Modal)`
  & .ant-modal-body {
    background-color: #303030;
  }
  & .ant-modal-close-x {
    color: white;
  }
`;

class SearchModal extends React.PureComponent {
  state = {
    visible: false,
  };

  initialState = {
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  closeModal = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible } = this.state;
    return (
      <div
        style={{ position: 'fixed', top: '20px', right: '20px', zIndex: '999' }}
      >
        <Button type="primary" onClick={this.showModal}>
          Buscar ruta
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
                onSelect={coordinates => {
                  console.log(coordinates);
                }}
              />
              <span>
                {`  `}a{`  `}
              </span>
              <SearchInput
                onSelect={coordinates => {
                  console.log(coordinates);
                }}
              />
              <span>{`  `}en un vehículo categoría I</span>
            </Header>
          </Segment>
        </ContainerModal>
      </div>
    );
  }
}

export default SearchModal;
