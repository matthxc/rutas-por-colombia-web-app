import { createSelector } from 'reselect';
import { initialTouristAttractionState } from './reducer';

/**
 * Direct selector to the tourist attraction state domain
 */

const selectTouristAttractionDomain = state =>
  state.get('touristAttraction', initialTouristAttractionState);

const makeSelectTouristAttraction = () =>
  createSelector(
    selectTouristAttractionDomain,
    substate => substate.toJS(),
  );

export { makeSelectTouristAttraction };
