import React from 'react';
import PropTypes from 'prop-types';

// Components
import withLoader from './withLoader';

// Styles
import { CenteredImageContainer, CenteredImage } from './styles/CenteredImage';

class CenteredImageComponent extends React.Component {
  static defaultProps = {
    aspectRatio: 'free',
  };

  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    style: PropTypes.object,
    aspectRatio: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.centeredImageContainer = null;
    this.centeredImage = null;
  }

  state = {
    vertical: false,
  };

  componentDidMount = () => {
    if (this.centeredImageContainer) {
      if (
        this.centeredImageContainer.clientWidth /
          this.centeredImageContainer.clientHeight <
        this.centeredImage.naturalWidth / this.centeredImage.naturalHeight
      ) {
        this.setState({ vertical: true });
      }
    }
  };

  render() {
    const { vertical } = this.state;
    const { className, id, style, aspectRatio, ...props } = this.props;
    let paddingTop = 0;
    if (aspectRatio !== 'free') {
      const aspectRatioNumbers = aspectRatio.split(':');
      paddingTop = `${(aspectRatioNumbers[1] / aspectRatioNumbers[0]) * 100}%`;
    }
    return (
      <CenteredImageContainer
        ref={element => {
          this.centeredImageContainer = element;
        }}
        className={className}
        id={id}
        style={style}
        aspectRatio={aspectRatio}
        paddingTop={paddingTop}
      >
        <CenteredImage
          ref={element => {
            this.centeredImage = element;
          }}
          vertical={vertical}
          {...props}
        />
      </CenteredImageContainer>
    );
  }
}

export default withLoader(CenteredImageComponent);
