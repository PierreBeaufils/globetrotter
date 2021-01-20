import { expect, should } from 'chai';

import travelReducer, { initialState } from 'src/reducers/travels';
import { saveTravels, fetchOneTravel, saveOneTravel } from 'src/actions/travels';

should();

describe('Reducer for travels', () => {
  // Structure Tests
  describe('Structure', () => {
    it('is a function', () => {
      travelReducer.should.be.a('function');
    });

    it('should return an object', () => {
      travelReducer().should.be.a('object');
    });

    it('should retour initialState if reducer is empty', () => {
      travelReducer().should.be.equal(initialState);
    });
  });
  // Actions Tests
  // should return a modified state when receive SAVE_RECIPES action
  describe('actions', () => {
    const travelsList = [{
      travel_id: 30,
      title: 'Séminaire à Rome',
      destination: 'Rome',
      departure_date: '2020-11-23T00:00:00.000Z',
      return_date: '2020-11-24T00:00:00.000Z',
      owner: 3,
      traveler_id: 3,
      first_name: 'pedro',
      last_name: 'fullstackos',
      gender: null,
      email: 'pedro@test.fr',
      phone: null,
      role: 'traveler',
      dob: null,
    }];
    const selectedTravel = {
      travel_id: 30,
      title: 'Séminaire à Rome',
      destination: 'Rome',
      departure_date: '2020-11-23T00:00:00.000Z',
      return_date: '2020-11-24T00:00:00.000Z',
      owner: 3,
      traveler_id: 3,
      first_name: 'pedro',
      last_name: 'fullstackos',
      gender: null,
      email: 'pedro@test.fr',
      phone: null,
      role: 'traveler',
      dob: null,
    };

    it('should return a modified state on SAVE_TRAVELS action', () => {
      // Création de l'action avec les bons paramètres
      const action = saveTravels(travelsList);
      // Execution du reducer avec les bons paramètres
      const modifiedState = travelReducer(initialState, action);
      // Comparaison du state modifié par le reducer avec le state qu'on attends théoriquement

      expect(modifiedState).to.be.eql({
        ...initialState,
        travels: travelsList,
      });
    });

    it.skip('should return a travel on FETCH_ONE_TRAVEL action', () => {
      // Création de l'action avec les bons paramètres
      const action = fetchOneTravel(30);
      console.log(action);
      const modifiedState = travelReducer(initialState, action);
      // Comparaison du state modifié par le reducer avec le state qu'on attends théoriquement

      expect(modifiedState).to.be.eql({
        ...initialState,
        currentTravel: selectedTravel,
      });
    });

    it('should return a modified state on SAVE_ONE_TRAVEL action', () => {
      // Création de l'action avec les bons paramètres
      const action = saveOneTravel(selectedTravel);
      const modifiedState = travelReducer(initialState, action);
      // Comparaison du state modifié par le reducer avec le state qu'on attends théoriquement

      expect(modifiedState).to.be.eql({
        ...initialState,
        currentTravel: selectedTravel,
      });
    });
  });
});
