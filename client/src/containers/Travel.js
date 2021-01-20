import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Travel from 'src/components/Travel';
import { fetchOneTravel, saveOneTravel } from 'src/actions/travels';

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  return {
    travel: state.travels.currentTravel,
    loadingTravel: state.travels.loadingTravel,
    id: ownProps.match.params.id,
    userID: state.user.session.id,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchOneTravel: (id) => {
    dispatch(fetchOneTravel(id));
  },
  saveOneTravel: (travel) => {
    dispatch(saveOneTravel(travel));
  },
});

// Container
const TravelContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Travel);

// == Export
export default withRouter(TravelContainer);
