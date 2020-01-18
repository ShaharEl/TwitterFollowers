import React from 'react';
import {shallow, mount} from 'enzyme';
import {Provider} from "react-redux";
import configureMockStore from "redux-mock-store";
import Home from '../components/Home';
import * as Actions from '../store/actions/twitterActionsTypes'

const mockStore = configureMockStore();
const store = mockStore({
    followers: []
});

describe(' with no props', () => {
    const container = mount(
        <Provider store={store}>
            <Home/>
        </Provider>
    );

    it('should have an input field', () => {
        expect(container.find("input")).toHaveLength(1);
    });

    it('should disable search button after click event', () => {
        container.find('button').first().simulate('click');
        expect(
            container.find('button').prop('disabled'))
    });

    it('should not render sorting dropdown if there are no followers', () => {
        expect(container.find("select")).toHaveLength(0);
    });

    it('should not render followers list if there are no followers', () => {
        expect(container.find("#followersContainer")).toHaveLength(0);
    });

});