/*
 *
 * Search actions
 *
 */

import { UPDATE_TOURIST_ATTRACTION } from './constants';

export const setTouristAttraction = data => ({
  type: UPDATE_TOURIST_ATTRACTION,
  payload: data,
});
