import React from 'react';
import { shallow } from 'enzyme';
import { expect, should } from 'chai';

import UserDashboard from 'src/components/UserDashboard';
import TravelCard from 'src/components/UserDashboard/TravelCard';

should();

describe('Composant UserDashboard', () => {
  const travels = [
    { travel_id: 1, title: 'Paris' },
    { travel_id: 2, title: 'Paris' },
    { travel_id: 2, title: 'Paris' },
  ];

  const wrapper = shallow(<UserDashboard travels={travels} />);
  it('should have homePage class', () => {
    wrapper.hasClass('userdashboard').should.be.equal(true);
  });

  it('renders 3 Travel cards when 3 travels given', () => {
    expect(wrapper.find(TravelCard)).to.have.lengthOf(3);
  });
});
