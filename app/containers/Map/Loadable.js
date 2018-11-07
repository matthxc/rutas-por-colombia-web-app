/**
 *
 * Asynchronously loads the component for Map
 *
 */
import React from 'react';
import loadable from 'loadable-components';

// Custom Loader
import ComponentLoader from 'components/ComponentLoader';

export const Map = loadable(() => import('./Map'), {
  render: props => <ComponentLoader {...props} />,
});

export const RoutingMachine = loadable(() => import('./RoutingMachine'), {
  render: props => <ComponentLoader {...props} />,
});
