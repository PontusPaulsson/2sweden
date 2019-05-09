import React from 'react'
import { shallow } from 'enzyme'
import SearchTrip from '../Components/SearchTrip.js'
import "should"
import "should-enzyme"

describe('SearchTrip component', () => {
    it('Should render one Search', () => {
        const component = shallow(<SearchTrip />);
        const searchTripElement = component.find(`[data-test='search-trip-container']`);
        expect(searchTripElement.length).toBe(1);
    })
})