import { connect } from 'react-redux';
import Contact from 'src/components/Contact';

const mapStateToProps = (state) => ({
  user: state.user.session,
});

const mapDispatchToProps = {};

// Container
const ContactContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Contact);

// == Export
export default ContactContainer;
