
import { FETCH_FORM_STRUCT } from "../actions/types";

export default (state = {...state} , action) => {
  switch (action.type) {
    case FETCH_FORM_STRUCT:
    { 
    state[action.form] = action.payload
      return state
    }
      
    default:
      return state;
  }
};