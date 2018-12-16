import React from 'react';
import styled from 'styled-components';

// Semantic
import { Header as SemanticHeader } from 'semantic-ui-react';

const BaseHeader = ({
  underline,
  children,
  type,
  spaced,
  uppercase,
  primary,
  letterSpacing,
  pointer,
  nomargin,
  color,
  underlineColor,
  ...props
}) => (
  <SemanticHeader as={type} {...props}>
    {children}
  </SemanticHeader>
);

export const Header = styled(BaseHeader)`
  &&& {
    color: ${props => props.theme[props.color]};
    ${props =>
      props.underline &&
      `
      padding-bottom: 0.67em;
      border-bottom: 1px solid ${props.theme[props.underlineColor]};
    `}
    ${props =>
      props.spaced &&
      `
      margin-top: 1em;
      margin-bottom: 1em;
    `}
    font-weight: ${props => props.weight};
    ${props =>
      props.uppercase &&
      `
      text-transform: uppercase;
    `}
    ${props =>
      props.primary &&
      `
      color: ${props.theme.primaryColor};
    `}
    ${props =>
      props.pointer &&
      `
      cursor: pointer;
    `}
    ${props =>
      props.nomargin &&
      `
      margin: 0;
    `}
    letter-spacing: ${props => props.letterSpacing}px;
  }
`;

export const Subheader = styled(SemanticHeader.Subheader)`
  ${Header} &&&& {
    color: inherit;
    font-size: 0.8em;
  }
`;
