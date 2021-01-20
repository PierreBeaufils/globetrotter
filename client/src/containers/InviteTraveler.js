import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import InviteTraveler from 'src/components/InviteTraveler';

const mapStateToProps = (state, ownProps) => {
  const { search } = ownProps.location;
  return {
    token: search,
  };
};

const mapDispatchToProps = {};

const InviteTravelerContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InviteTraveler);

export default withRouter(InviteTravelerContainer);
