import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the search state domain
 */

const selectSearchDomain = state => state.get('search', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Search
 */

const makeSelectSearch = () =>
  createSelector(selectSearchDomain, substate => substate.toJS());

export default makeSelectSearch;
export { selectSearchDomain };
