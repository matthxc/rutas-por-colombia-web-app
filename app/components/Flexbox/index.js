import PropTypes from 'prop-types';
import styled from 'styled-components';

const Item = styled.div`
  padding-left: 12px;
  padding-right: 12px;
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
  }
`;

const Flexbox = styled.div`
  display: flex;
  flex-direction: ${props => props.direction};
  justify-content: ${props => props.justify};
  align-items: ${props => props.align};
  align-content: ${props => props.content};
  flex-wrap: ${props => props.wrap};
  height: 100%;
  width: 100%;
  flex: 0 0 auto;
  ${Item} {
    ${props =>
      props.verticalPadded &&
      `
      padding-top: 12px;
      padding-bottom: 12px;
    `}
  }
`;

Flexbox.Item = Item;

Flexbox.defaultProps = {
  justify: 'flex-start',
  align: 'stretch',
  content: 'stretch',
  direction: 'row',
  wrap: 'nowrap',
  verticalPadded: false,
};

Flexbox.propTypes = {
  justify: PropTypes.string,
  align: PropTypes.string,
  content: PropTypes.string,
  direction: PropTypes.string,
  wrap: PropTypes.string,
  verticalPadded: PropTypes.bool,
};

export default Flexbox;
