import {
  CREATE_CHARACTER_SUCCESS
} from '../actions/createCharacter'

let initialState = {
  isFetching: false,
  items: []
}

const characters = (state = initialState, action) => {
  switch(action.type) {
    case CREATE_CHARACTER_SUCCESS:
      return Object.assign({}, state, { items: state.items.concat(action.character) })
    default:
      return state
  }
}

export default characters
