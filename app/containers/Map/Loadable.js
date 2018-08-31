/**
 *
 * Asynchronously loads the component for Map
 *
 */

import Loadable from 'react-loadable';

export const Map = Loadable({
  loader: () => import('./Map'),
  loading: () => null,
});

export const RoutingMachine = Loadable({
  loader: () => import('./RoutingMachine'),
  loading: () => null,
});
