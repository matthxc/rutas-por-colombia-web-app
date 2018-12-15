/**
 *
 * Button
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Semantic
import { Button as SemanticButton } from 'semantic-ui-react';

// Components
import Text from './Text';
import Subtitle from './Subtitle';

const BaseButton = ({ uppercase, wider, children, ...props }) => (
  <SemanticButton {...props}>{children}</SemanticButton>
);

const Button = styled(BaseButton)`
  &&& {
    &,
    & * {
      ${props => (props.uppercase ? 'text-transform: uppercase;' : '')}
    }
    > :not(:first-child) {
      margin-top: 0.5em;
    }
    ${props => (props.wider ? `padding-left: 3em;padding-right: 3em;` : '')}
    &.inverted:not(.primary) {
      box-shadow: 0px 0px 0px 2px ${props => props.theme[props.color]} inset !important;
      color: ${props => props.theme[props.color]};
      &:hover,
      &:focus {
        background-color: ${props => props.theme[props.color]};
        color: white;
      }
    }
    ${props => props.padded && `padding: 2em 4em;`}
  }
`;

class ButtonComponent extends React.PureComponent {
  static propTypes = {
    children: PropTypes.any,
    uppercase: PropTypes.bool,
    wider: PropTypes.bool,
    color: PropTypes.string,
    padded: PropTypes.bool,
  };

  static defaultProps = {
    uppercase: false,
    wider: false,
    color: 'textColor',
    padded: false,
  };

  static Subtitle = Subtitle;

  static Text = Text;

  render() {
    const { children, ...props } = this.props;
    return <Button {...props}>{children}</Button>;
  }
}

export default ButtonComponent;
