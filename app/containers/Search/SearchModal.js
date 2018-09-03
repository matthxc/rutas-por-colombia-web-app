import React from 'react';

// Antd
import Modal from 'antd/lib/modal';
import 'antd/lib/modal/style/index.css';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';

// Semantic
import { Segment, Header } from 'semantic-ui-react';

// Components
import SearchInput from './SearchInput';

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
        <Modal
          visible={visible}
          title="Title"
          onCancel={this.closeModal}
          footer={null}
          destroyOnClose
        >
          <Segment basic padded="very">
            <span>Quiero conocer la ruta de </span>
            <SearchInput
              onSelect={coordinates => {
                console.log(coordinates);
              }}
            />
            <span>a </span>
            <SearchInput
              onSelect={coordinates => {
                console.log(coordinates);
              }}
            />
            <span>en un vehículo categoría</span>
          </Segment>
        </Modal>
      </div>
    );
  }
}

export default SearchModal;
