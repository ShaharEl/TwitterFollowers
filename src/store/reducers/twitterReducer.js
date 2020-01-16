import * as Actions from '../actions/twitterActions'

const initState = {
    followers: []
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case Actions.ADD_FOLLOWERS:
            return {followers: action.followers};
        default:
            return state;
    }
};

export default reducer;