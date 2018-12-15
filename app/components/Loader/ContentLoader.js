import React from 'react';
import PropTypes from 'prop-types';

// Ant
import Skeleton from 'antd/lib/skeleton';

// Semantic
import { Container, Header, Segment } from 'semantic-ui-react';

const ContentLoader = ({
  loading,
  state,
  rows,
  isEmpty,
  emptyText,
  render,
  component,
}) => {
  const renderContentLoader = active =>
    Array(rows)
      .fill()
      .map((e, index) => (
        <Segment padded="very" basic key={index}>
          <Skeleton active={active} />
        </Segment>
      ));
  const renderEmpty = () => (
    <Container>
      <Segment basic padded="very" textAlign="center">
        <Header as="h2">{emptyText}</Header>
      </Segment>
      {renderContentLoader(false)}
    </Container>
  );
  return (
    <React.Fragment>
      {state !== 'PENDING' && !isEmpty && (component || render())}
      {!loading && state === 'SUCCESS' && isEmpty && renderEmpty()}
      {loading && <Container>{renderContentLoader(true)}</Container>}
    </React.Fragment>
  );
};

ContentLoader.defaultProps = {
  loading: false,
  state: 'PENDING',
  rows: 4,
  isEmpty: false,
  emptyText: 'No content to show',
  component: null,
  render: () => null,
};

ContentLoader.propTypes = {
  loading: PropTypes.bool,
  state: PropTypes.string,
  rows: PropTypes.number,
  render: PropTypes.func,
  isEmpty: PropTypes.bool,
  emptyText: PropTypes.string,
  component: PropTypes.node,
};

export default ContentLoader;
