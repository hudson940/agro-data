
import { FETCH_FORM_STRUCT } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_FORM_STRUCT:
      return action.payload;
    default:
      return state;
  }
};