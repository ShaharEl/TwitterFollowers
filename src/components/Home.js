import React, {useState, useEffect} from 'react';
import {getFollowers} from "../services/twitterService"
import './Home.css'
import * as actions from "../store/actions/twitterActions"
import connect from "react-redux/es/connect/connect";
import Follower from '../components/Follower'
import InfiniteScroll from 'react-infinite-scroller';

const Home = (props) => {

    const [accountName, setAccountName] = useState('');
    const [cursor, setCursor] = useState(-1);
    //const [isLoading, setLoading] = useState(false);

    const searchFollowers = () => {
        getFollowers(accountName, cursor, updateFollowers);
    };


    const updateFollowers = (next_cursor, users) => {
        props.addFollowers(users);
        setCursor(next_cursor);
    };

    // const trackScrolling = () => {
    //     const wrappedElement = document.getElementById('body');
    //     if (wrappedElement.getBoundingClientRect().bottom <= window.innerHeight) {
    //         getFollowers(accountName, cursor, updateFollowers);
    //     }
    // };
    //
    //
    // useEffect(() => {
    //     document.addEventListener('scroll', trackScrolling);
    // });


    let twitterFollowers = props.twitterFollowers;

    return (
        <div id={'body'}>
            <div>Please enter a name of a Twitter account</div>
            <input type="text" placeholder="account name" onChange={(e) => setAccountName(e.target.value)}/>
            <button type="button" onClick={searchFollowers}>Search followers</button>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-8 col-lg-5">
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={searchFollowers}
                            hasMore={cursor !== 0}
                            loader={<div className="loader" key={0}>Loading ...</div>}
                            useWindow={false}>
                        <ul className="list-group">
                            {twitterFollowers && twitterFollowers.length > 0 && twitterFollowers.map((follower, index) =>
                                <Follower
                                    follower={follower} index={index}/>)}
                        </ul>
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        </div>)
};

const mapStateToProps = state => {
    return {twitterFollowers: state.followers}
};

const mapDispatchToProps = dispatch => {
    return {
        addFollowers: (followers) => dispatch({type: actions.ADD_FOLLOWERS, followers})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);