import * as Actions from '../actions/twitterActions'

const initState = {
    followers: []
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case Actions.ADD_FOLLOWERS:
           return {followers: action.followers};
        case Actions.UPDATE_FOLLOWERS:
            const updatedFollowers = state.followers.concat(action.followers);
            return {
                ...state, followers: updatedFollowers
            };
        default:
            return state;
    }
};


export default reducer;