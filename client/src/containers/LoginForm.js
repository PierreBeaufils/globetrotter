import { connect } from 'react-redux';
import LoginForm from 'src/components/LoginForm';
import { changeFieldValue, handleLogin } from 'src/actions/user';

const mapStateToProps = (state) => ({
  email: state.user.login.email,
  password: state.user.login.password,
  error: state.user.error,
});

const mapDispatchToProps = (dispatch) => ({
  changeFieldValue: (section, field, value) => {
    dispatch(changeFieldValue(section, field, value));
  },
  handleLogin: () => {
    dispatch(handleLogin());
  },
});

const LoginFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);

export default LoginFormContainer;
