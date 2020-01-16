import React from 'react';
import {useState} from 'react';
import {getFollowers} from "../services/twitterService"
import './Home.css'
import * as actions from "../store/actions/twitterActions"
import connect from "react-redux/es/connect/connect";
import FollowersContainer from './FollowersContainer'

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

    return (
        <div>
            <div>Please enter a name of a Twitter account</div>
            <input type="text" placeholder="account name" onChange={(e) => setAccountName(e.target.value)}/>
            <button type="button" onClick={() => searchFollowers(true)}>Search followers</button>
            <FollowersContainer loadMore={searchFollowers} cursor={cursor} {...props}/>
        </div>)
};

const mapStateToProps = state => {
    return {twitterFollowers: state.followers}
};

const mapDispatchToProps = dispatch => {
    return {
        addFollowers: (followers) => dispatch({type: actions.ADD_FOLLOWERS, followers}),
        updateFollowers: (followers) => dispatch({type: actions.UPDATE_FOLLOWERS, followers})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);