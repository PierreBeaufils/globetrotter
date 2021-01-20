import { connect } from 'react-redux';
import App from 'src/components/App';
import { loginCheck } from 'src/actions/user';

const mapStateToProps = (state) => ({
  loggedIn: state.user.loggedIn,
  loading: state.user.loading,
  user: state.user.session,
});

const mapDispatchToProps = (dispatch) => ({
  loginCheck: () => {
    dispatch(loginCheck());
  },
});

// Container
const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

// == Export
export default AppContainer;
