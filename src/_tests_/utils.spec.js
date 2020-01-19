import {dynamicSort} from "../services/utils";

const followers = [
    {name: 'Shahar', location: 'Jerusalem'},
    {name: 'Dana', location: 'Haifa'},
    {name: 'Barak', location: 'Eilat'},
    {name: 'Tal', location: 'Alabama'},
];

const followersSortedByName = [
    {name: 'Barak', location: 'Eilat'},
    {name: 'Dana', location: 'Haifa'},
    {name: 'Shahar', location: 'Jerusalem'},
    {name: 'Tal', location: 'Alabama'},
];

const followersSortedByLocation = [
    {name: 'Tal', location: 'Alabama'},
    {name: 'Barak', location: 'Eilat'},
    {name: 'Dana', location: 'Haifa'},
    {name: 'Shahar', location: 'Jerusalem'},
];


describe('Dynamic sort util returns expected results', () => {
    it('Array should be sorted by name property', () => {
        let sortedFollowersByName =  followers.sort(dynamicSort('name'));
        expect(sortedFollowersByName).toEqual(followersSortedByName)
    });

    it('Array should be sorted by location property', () => {
        let sortedFollowersByLocation = followers.sort(dynamicSort('location'));
        expect(sortedFollowersByLocation).toEqual(followersSortedByLocation)
    });

    it('Array should not be sorted by location property if we pass name property', () => {
        let sortedFollowersByName = followers.sort(dynamicSort('name'));
        expect(sortedFollowersByName).not.toBe(followersSortedByLocation)
    });

    it('Array should not be sorted by name property if we pass location property', () => {
        let sortedFollowersByLocation = followers.sort(dynamicSort('location'));
        expect(sortedFollowersByLocation).not.toBe(followersSortedByName)
    })
});


