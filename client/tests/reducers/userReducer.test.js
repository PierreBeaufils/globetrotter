import { should } from 'chai';

import userReducer, { initialState } from 'src/reducers/user';

import {
  changeFieldValue,
  saveUser,
  logout,
} from 'src/actions/user';

should();

describe('User Reducer', () => {
  const testSession = {
    logged: true,
    session: {
      id: 3,
      first_name: 'pedro',
      last_name: 'pmlopj',
      email: 'pedro@test.fr',
      role: 'traveler',
    },
  };

  describe('Structure', () => {
    it('is a function', () => {
      userReducer.should.be.a('function');
    });

    it('returns the state with initial state value when called without arguments', () => {
      userReducer().should.be.equal(initialState);
    });
  });

  describe('Actions', () => {
    it('Change Login field Value', () => {
      let action = changeFieldValue('login', 'email', 'test@mail.fr');
      userReducer({}, action).should.be.eql({ login: { email: 'test@mail.fr' } });

      action = changeFieldValue('login', 'password', 'testPassword');
      userReducer({}, action).should.be.eql({ login: { password: 'testPassword' } });
    });

    it('SAVE_USER', () => {
      const action = saveUser(testSession);

      userReducer({}, action).should.be.eql({
        loggedIn: true,
        session: {
          id: 3,
          first_name: 'pedro',
          last_name: 'pmlopj',
          email: 'pedro@test.fr',
          role: 'traveler',
        },
      });
    });

    it('LOGOUT', () => {
      const action = logout();
      const state = {
        loggedIn: true,
        session: testSession.session,
      };
      userReducer(state, action).should.be.eql({
        loggedIn: false,
        session: {},
      });
    });
  });
});
