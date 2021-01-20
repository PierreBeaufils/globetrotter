import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TravelDashboard from 'src/components/TravelDashboard';
import { fetchOneTravel } from 'src/actions/travels';

const mapStateToProps = (state, ownProps) => ({
  travel: state.travels.currentTravel,
  loadingTravel: state.travels.loadingTravel,
  id: ownProps.match.params.id,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOneTravel: (id) => {
    dispatch(fetchOneTravel(id));
  },
});

// Container
const TravelDashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TravelDashboard);

// == Export
export default withRouter(TravelDashboardContainer);
