
import type { Action } from '../actions/types';
import { SET_USER } from '../actions/user';

export type State = {
    name: string,
    email: string,
    password: string,
}

const initialState = {
  name: '',
  email:'',
  password:'',
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_USER) {
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
      password: action.payload.password,
    };
  }
  return state;
}
