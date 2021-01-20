import { connect } from 'react-redux';
import TravelForm from 'src/components/TravelForm';
import { submitTravelForm, changeFieldValue } from 'src/actions/travels';

const mapStateToProps = (state) => ({
  travel: state.travels.currentTravel,
  ownerId: state.user.session.id,
});

const mapDispatchToProps = (dispatch) => ({
  submitTravelForm: (data) => {
    dispatch(submitTravelForm(data));
  },
  changeFieldValue: (field, value) => {
    dispatch(changeFieldValue(field, value));
  },
});

const TravelFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TravelForm);

export default TravelFormContainer;
