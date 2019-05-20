import React from 'react'
import { shallow } from 'enzyme'
import {Navbar} from '../Components/Navbar'

describe('Navbar component', () => {
    it('Should render one navbar', () => {
        const component = shallow(<Navbar/>);
        const navBarElement = component.find(`[data-test='nav-bar-container']`)
        expect(navBarElement.length).toBe(1)
    })
})