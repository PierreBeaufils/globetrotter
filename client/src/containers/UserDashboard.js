import { connect } from 'react-redux';
import UserDashboard from 'src/components/UserDashboard/';
import { fetchUserData } from 'src/actions/user';
import { fetchTravels } from 'src/actions/travels';

const mapStateToProps = (state) => ({
  user: state.user.profile,
  travels: state.travels.travels,
  loadingTravels: state.travels.loadingTravels,
  loadingUser: state.user.loadingUser,
  userID: state.user.session.id,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserData: () => {
    dispatch(fetchUserData());
  },
  fetchTravels: () => {
    dispatch(fetchTravels());
  },
});

const UserDashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserDashboard);

export default UserDashboardContainer;
