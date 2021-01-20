export const CHANGE_FIELD_VALUE = 'CHANGE_FIELD_VALUE';
export const HANDLE_LOGIN = 'HANDLE_LOGIN';
export const SAVE_USER = 'SAVE_USER';
export const HANDLE_SIGNUP = 'HANDLE_SIGNUP';
export const VALIDATE_REGISTER = 'VALIDATE_REGISTER';
export const VERIFY_TOKEN = 'VERIFY_TOKEN';
export const SET_TOKEN_VERIFIED = 'SET_TOKEN_VERIFIED';
export const SET_TOKEN_MESSAGE = 'SET_TOKEN_MESSAGE';
export const LOGIN_CHECK = 'LOGIN_CHECK';
export const SET_LOGGED = 'SET_LOGGED';
export const LOGOUT = 'LOGOUT';
export const SET_ERROR = 'SET_ERROR';
export const SET_LOADING_STATE = 'SET_LOADING_STATE';
export const HANDLE_EDIT_PROFILE = 'HANDLE_EDIT_PROFILE';
export const FETCH_USER_DATA = 'FETCH_USER_DATA';
export const FILL_PROFILE = 'FILL_PROFILE';
export const LOADING_USER = 'LOADING_USER';

export const changeFieldValue = (section, field, value) => ({
  type: CHANGE_FIELD_VALUE,
  section,
  field,
  value,
});

export const handleSignup = () => ({
  type: HANDLE_SIGNUP,
});

export const validateRegister = (boolean) => ({
  type: VALIDATE_REGISTER,
  boolean,
});

export const verifyToken = (token) => ({
  type: VERIFY_TOKEN,
  token,
});

export const setTokenMessage = (message) => ({
  type: SET_TOKEN_MESSAGE,
  message,
});

export const setTokenVerified = (verified) => ({
  type: SET_TOKEN_VERIFIED,
  verified,
});

export const handleLogin = () => ({
  type: HANDLE_LOGIN,
});

export const saveUser = (user) => ({
  type: SAVE_USER,
  user,
});

export const loginCheck = (logged, session) => ({
  type: LOGIN_CHECK,
  logged,
  session,
});

export const setLogged = (logged) => ({
  type: SET_LOGGED,
  logged,
});

export const logout = () => ({
  type: LOGOUT,
});

export const setError = (error) => ({
  type: SET_ERROR,
  error,
});

export const setLoadingState = (loading) => ({
  type: SET_LOADING_STATE,
  loading,
});

export const fetchUserData = () => ({
  type: FETCH_USER_DATA,
});

export const loadingUser = (loading) => ({
  type: LOADING_USER,
  loading,
});

export const fillProfile = (infos) => ({
  type: FILL_PROFILE,
  infos,
});

export const handleEditProfile = () => ({
  type: HANDLE_EDIT_PROFILE,
});
