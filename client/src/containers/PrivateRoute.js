import { connect } from 'react-redux';
import PrivateRoute from 'src/components/App/PrivateRoute';

const mapStateToProps = (state) => ({
  loggedIn: state.user.loggedIn,
});

const mapDispatchToProps = {};

const PrivateRouteContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrivateRoute);

export default (PrivateRouteContainer);
