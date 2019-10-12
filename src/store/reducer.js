import * as actionTypes from './acttion'


const INGRIDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

const initialState = {
  ingridients: {
    salad: 1,
    bacon: 1,
    cheese: 1,
    meat: 1
  },
  totalPrice: 6.9
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGRIDIENT:
      return {
        ...state,
        ingridients: {
          ...state.ingridients,
          [action.ingridientName]: state.ingridients[action.ingridientName] + 1
        }, 
        totalPrice: state.totalPrice + INGRIDIENT_PRICES[action.ingridientName]
      }
    case actionTypes.REMOVE_INGRIDIENT:
      return {
        ...state,
        ingridients: {
          ...state.ingridients,
          [action.ingridientName]: state.ingridients[action.ingridientName] - 1
        },
        totalPrice: state.totalPrice - INGRIDIENT_PRICES[action.ingridientName]

      }
    default:
      return state
  }
}

export default reducer