import React from 'react';
import {useState} from 'react';
import {getFollowers, sortFollowers} from "../services/twitterService"
import './Home.css'
import * as actions from "../store/actions/twitterActions"
import connect from "react-redux/es/connect/connect";
import FollowersContainer from './FollowersContainer'
import SelectDropDown from '../components/SelectDropDown'

const Home = (props) => {

    const [accountName, setAccountName] = useState('');
    const [cursor, setCursor] = useState(-1);

    const searchFollowers = (isButtonEvent) => {
        getFollowers(accountName, cursor, isButtonEvent, addFollowers);
    };

    const addFollowers = (next_cursor, users, isButtonEvent) => {
        isButtonEvent === true ? props.addFollowers(users) : props.updateFollowers(users);
        setCursor(next_cursor);
    };

    const sortFollowers = (optionType) => {
        let sortedFollowers = [];
        switch (optionType) {
            case sortOptions.accountName:
                sortedFollowers = sortFollowers(props.twitterFollowers, true);
                props.addFollowers(sortedFollowers);
                break;
            case sortOptions.screenName:
                sortedFollowers = sortFollowers(props.twitterFollowers, false);
                props.addFollowers(sortedFollowers);
                break;
            default:
                break;
        }
    };

    const sortOptions = {
        sortBy: 'Sort By',
        accountName: 'Account Name',
        screenName: 'Screen Name'
    };

    return (
        <div>
            <div>Please enter a name of a Twitter account</div>
            <div>
                <input type="text" placeholder="account name" onChange={(e) => setAccountName(e.target.value)}/>
                <button type="button" onClick={() => searchFollowers(true)}>Search followers</button>
            </div>
            <SelectDropDown options={sortOptions} onChange={sortFollowers}/>
            <FollowersContainer loadMore={searchFollowers} cursor={cursor} twitterFollowers={props.twitterFollowers}/>
        </div>)
};

const mapStateToProps = state => {
    return {
        twitterFollowers: state.followers
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addFollowers: (followers) => dispatch({type: actions.ADD_FOLLOWERS, followers}),
        updateFollowers: (followers) => dispatch({type: actions.UPDATE_FOLLOWERS, followers})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);