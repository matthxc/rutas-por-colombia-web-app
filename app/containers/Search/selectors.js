import { createSelector } from 'reselect';
import { initialSearchState } from './reducer';

/**
 * Direct selector to the search state domain
 */

const selectSearchDomain = state =>
  state.get('searchParameters', initialSearchState);

const makeSelectSearch = () =>
  createSelector(selectSearchDomain, substate => substate.toJS());

export { selectSearchDomain, makeSelectSearch };
