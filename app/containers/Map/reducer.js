/*
 *
 * Map reducer
 *
 */

import { fromJS } from 'immutable';
import { SET_ROUTE_RESULTS, RESET_ROUTE_RESULTS } from './constants';

export const initialRouteResultsState = fromJS({
  totalPrice: null,
  duration: null,
  distance: null,
  tollCollectors: null,
  loading: false,
});

export const routeResultsReducer = (
  state = initialRouteResultsState,
  action,
) => {
  switch (action.type) {
    case SET_ROUTE_RESULTS:
      return state.merge({
        ...action.payload,
      });
    case RESET_ROUTE_RESULTS:
      return initialRouteResultsState;
    default:
      return state;
  }
};
