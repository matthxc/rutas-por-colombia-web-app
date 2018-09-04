/*
 *
 * Search actions
 *
 */

import { UPDATE_SEARCH_PARAMETERS } from './constants';

export const searchRoute = searchParameters => ({
  type: UPDATE_SEARCH_PARAMETERS,
  payload: searchParameters,
});
