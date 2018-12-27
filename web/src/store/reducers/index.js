import { combineReducers } from "redux";

import formStruct from "./formStructReducer";
import coords from './getLocationReducer'

export default combineReducers({
  formStruct,
  coords
});