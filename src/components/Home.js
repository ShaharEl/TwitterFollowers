import React from 'react';
import {useState} from 'react';
import {getFollowers, sortFollowers} from "../services/twitterService"
import './Home.css'
import * as actions from "../store/actions/twitterActions"
import connect from "react-redux/es/connect/connect";
import FollowersContainer from './FollowersContainer'
import SelectDropDown from '../components/SelectDropDown'
import {sortOptions} from "../enums/sortOptions";
import {isEmptyObject} from "../services/utils";
import {errorMessages} from "../enums/errorMessages";

const Home = (props) => {

    const [accountName, setAccountName] = useState('');
    const [cursor, setCursor] = useState(-1);
    const [error, setError] = useState({
        showError: false,
        errorText: ''
    });
    const [loadingResults, setLoadingResults] = useState(false);


    const searchFollowers = async (isButtonEvent) => {
        setLoadingResults(true);
        if (isEmptyObject(accountName)) {
            setError({
                ...error,
                showError: true,
                errorText: errorMessages.emptyAccountName
            });
        } else {
            setError({
                ...error,
                showError: false,
                errorText: ''
            });
            const errorFromServer = await getFollowers(accountName, cursor, isButtonEvent, addFollowers);
            if(errorFromServer && !isEmptyObject(errorFromServer.messageKey)){
                setError({
                    ...error,
                    showError: true,
                    errorText: errorMessages.serverError
                });
            }
        }
        setLoadingResults(false);
    };

    const addFollowers = (next_cursor, users, isButtonEvent) => {
        if (!users || users.length === 0) {
            setError({
                ...error,
                showError: true,
                errorText: errorMessages.noResults
            });
        } else {
            isButtonEvent === true ? props.addFollowers(users) : props.updateFollowers(users);
            setCursor(next_cursor);
        }
        setLoadingResults(false);
    };

    const onSortClick = (optionType) => {
        switch (optionType) {
            case sortOptions.accountName:
                props.addFollowers(sortFollowers({followers: props.twitterFollowers, sortByAccount: true}));
                break;
            case sortOptions.screenName:
                props.addFollowers(sortFollowers({followers: props.twitterFollowers, sortByAccount: false}));
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <div>Please enter a name of a Twitter account</div>
            <div>
                <input type="text" className="input" placeholder="account name"
                       onChange={(e) => setAccountName(e.target.value)}/>
                <button disabled={loadingResults} type="button" onClick={() => searchFollowers(true)}>Search followers
                </button>
                <label className="errorLabel">{error.errorText}</label>
            </div>
            {props.twitterFollowers && props.twitterFollowers.length > 0 &&
            <SelectDropDown options={sortOptions} onChange={onSortClick}/>}
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