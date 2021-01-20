import { connect } from 'react-redux';
import Navbar from 'src/components/Navbar';
import { logout } from 'src/actions/user';

const mapStateToProps = (state) => ({
  loggedIn: state.user.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(logout());
  },
});

// Container
const NavbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navbar);

// == Export
export default NavbarContainer;
