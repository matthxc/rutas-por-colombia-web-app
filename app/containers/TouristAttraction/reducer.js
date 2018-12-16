/*
 *
 * Tourist Attraction reducer
 *
 */

import { fromJS } from 'immutable';
import { UPDATE_TOURIST_ATTRACTION } from './constants';

export const initialTouristAttractionState = fromJS({});

export const touristAttractionReducer = (
  state = initialTouristAttractionState,
  action,
) => {
  switch (action.type) {
    case UPDATE_TOURIST_ATTRACTION:
      return state.merge({
        ...action.payload,
      });
    default:
      return state;
  }
};
