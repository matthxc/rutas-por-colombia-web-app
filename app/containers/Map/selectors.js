import { createSelector } from 'reselect';
import { initialRouteResultsState } from './reducer';

/**
 * Direct selector to the map state domain
 */

const selectRouteResultsDomain = state =>
  state.get('routeResults', initialRouteResultsState);

const makeSelectRouteResults = () =>
  createSelector(selectRouteResultsDomain, substate => substate.toJS());

export { selectRouteResultsDomain, makeSelectRouteResults };
