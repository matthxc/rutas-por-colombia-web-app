/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

// Semantic
import { Header as SemanticHeader } from 'semantic-ui-react';

// Styñes
import { Header, Subheader } from './styles';

class HeaderComponent extends React.PureComponent {
  static Subheader = Subheader;

  static Content = SemanticHeader.Content;

  static propTypes = {
    children: PropTypes.node,
    underline: PropTypes.bool,
    weight: PropTypes.string,
    uppercase: PropTypes.bool,
    primary: PropTypes.bool,
    letterSpacing: PropTypes.number,
    pointer: PropTypes.bool,
    nomargin: PropTypes.bool,
    color: PropTypes.string,
    underlineColor: PropTypes.string,
  };

  static defaultProps = {
    underline: false,
    weight: 'bold',
    uppercase: false,
    primary: false,
    letterSpacing: 0,
    pointer: false,
    nomargin: false,
    color: 'textColor',
    underlineColor: 'primaryColor',
  };

  render() {
    const { children, ...props } = this.props;
    return <Header {...props}>{children}</Header>;
  }
}

export default HeaderComponent;
