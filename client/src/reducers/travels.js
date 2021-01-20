import {
  SAVE_TRAVELS, LOADING_TRAVELS, LOADING_TRAVEL, ERROR_MESSAGE, SAVE_ONE_TRAVEL,
} from 'src/actions/travels';

export const initialState = {
  errorMessage: null,
  travels: [],
  loadingTravels: true,
  loadingTravel: true,
  currentTravel: {},
};

const travels = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_TRAVELS:
      return {
        ...state,
        travels: action.travels,
      };
    case LOADING_TRAVELS:
      return {
        ...state,
        loadingTravels: action.loading,
      };
    case LOADING_TRAVEL:
      return {
        ...state,
        loadingTravel: action.loading,
      };
    case SAVE_ONE_TRAVEL:
      return {
        ...state,
        currentTravel: action.travel,
      };
    case ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.error,
      };
    default:
      return state;
  }
};

export default travels;
