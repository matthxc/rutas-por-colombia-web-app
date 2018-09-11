/*
 *
 * Map actions
 *
 */

import { SET_ROUTE_RESULTS, RESET_ROUTE_RESULTS } from './constants';

export const setRouteResults = routeResults => ({
  type: SET_ROUTE_RESULTS,
  payload: routeResults,
});

export const resetRouteResults = () => ({
  type: RESET_ROUTE_RESULTS,
});
