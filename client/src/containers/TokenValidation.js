import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TokenValidation from 'src/components/RegisterForm/TokenValidation';
import { verifyToken } from 'src/actions/user';

const mapStateToProps = (state, ownProps) => {
  const { search } = ownProps.location;
  return {
    token: search,
    isTokenVerified: state.user.isTokenVerified,
    tokenMessage: state.user.tokenMessage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  verifyToken: (token) => {
    dispatch(verifyToken(token));
  },
});

const TokenValidationContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TokenValidation);

export default withRouter(TokenValidationContainer);
