import { connect } from 'react-redux';
import Profile from 'src/components/UserProfile/Profile';
import { changeFieldValue, handleEditProfile } from 'src/actions/user';

const mapStateToProps = (state) => ({
  user: state.user.profile,
});

const mapDispatchToProps = (dispatch) => ({
  changeFieldValue: (section, field, value) => {
    dispatch(changeFieldValue(section, field, value));
  },
  handleEditProfile: () => {
    dispatch(handleEditProfile());
  },
});

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);

export default ProfileContainer;
