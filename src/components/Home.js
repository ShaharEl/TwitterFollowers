import React from 'react';
import {useState} from 'react';
import {connect} from "react-redux";
import {getFollowers, sortFollowers} from "../services/twitterService";
import * as actions from "../store/actions/twitterActionsTypes";
import FollowersContainer from './FollowersContainer';
import SelectDropDown from './generic/SelectDropDown';
import {sortOptions} from "../enums/sortOptions";
import {isEmptyObject} from "../services/utils";
import {errorMessages} from "../enums/errorMessages";
import './Home.css';

const Home = (props) => {
    const [accountName, setAccountName] = useState('');
    const [cursor, setCursor] = useState(-1);
    const [error, setError] = useState({
        showError: false,
        errorText: ''
    });
    const [loadingResults, setLoadingResults] = useState(false);

    const isValidAccountName = (accountName) => {
        if (isEmptyObject(accountName)) {
            setError({
                ...error,
                showError: true,
                errorText: errorMessages.emptyAccountName
            });
            return false;
        } else {
            setError({
                ...error,
                showError: false,
                errorText: ''
            });
            return true;
        }
    };

    const updateFollowersOnScroll = async () => {
        setLoadingResults(true);
        try {
            const responseFromApi = await getFollowers(accountName, cursor, false);
            await addOrUpdateFollowersIntoStore(responseFromApi.cursor, responseFromApi.users, responseFromApi.isButtonEvent);
            setLoadingResults(false);
        }
        catch(err){
            showError(err);
            setLoadingResults(false);
        }
    };

    const searchFollowers = async () => {
        if (!isValidAccountName(accountName)) return;
        setLoadingResults(true);
        setCursor(-1);
        try {
            const responseFromApi = await getFollowers(accountName, cursor, true);
            await addOrUpdateFollowersIntoStore(responseFromApi.cursor, responseFromApi.users, responseFromApi.isButtonEvent);
            setLoadingResults(false);
        }
        catch(err){
            showError(err);
            setLoadingResults(false);
        }
    };

    const showError = (errorObject) => {
        setError({
            ...error,
            showError: true,
            errorText: errorObject.messageKey
        });
    };


    const addOrUpdateFollowersIntoStore = (next_cursor, users, isButtonEvent) => {
        return new Promise((resolve, reject) => {
            if (!users || users.length === 0) {
                reject({error: true, messageKey: errorMessages.noResults});
            } else {
                isButtonEvent === true ? props.addFollowers(users) : props.updateFollowers(users);
                setCursor(next_cursor);
                resolve('success');
            }
        });
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
            <div>
                <input id="accountNameInput" type="text" className="input" placeholder="account name"
                       onChange={(e) => setAccountName(e.target.value)}/>
                <button disabled={loadingResults} type="button" onClick={() => searchFollowers(true)}>Search followers</button>
                <label className="errorLabel">{error.errorText}</label>
            </div>
            {props.twitterFollowers && props.twitterFollowers.length > 0 &&
            <>
                <SelectDropDown title={'Sort Followers'} options={sortOptions} onChange={onSortClick}/>
                <FollowersContainer loadMore={updateFollowersOnScroll} cursor={cursor}
                                    loadingResults={loadingResults} twitterFollowers={props.twitterFollowers}/>
            </>}
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