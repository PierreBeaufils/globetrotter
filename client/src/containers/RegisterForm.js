import { connect } from 'react-redux';
import RegisterForm from 'src/components/RegisterForm';
import { changeFieldValue, handleSignup } from 'src/actions/user';

const mapStateToProps = (state) => ({
  fields: state.user.signup,
  error: state.user.error,
  validateRegister: state.user.validateRegister,
});
const mapDispatchToProps = (dispatch) => ({
  changeFieldValue: (section, field, value) => {
    dispatch(changeFieldValue(section, field, value));
  },
  handleSignup: () => {
    dispatch(handleSignup());
  },
});

const RegisterFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterForm);

export default RegisterFormContainer;
