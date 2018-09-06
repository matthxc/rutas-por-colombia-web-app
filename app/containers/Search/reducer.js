/*
 *
 * Search reducer
 *
 */

import { fromJS } from 'immutable';
import { UPDATE_SEARCH_PARAMETERS } from './constants';

export const initialSearchState = fromJS({
  locationFrom: null,
  locationTo: null,
  category: 0,
});

export const searchReducer = (state = initialSearchState, action) => {
  switch (action.type) {
    case UPDATE_SEARCH_PARAMETERS:
      return state.merge({
        ...action.payload,
      });
    default:
      return state;
  }
};
