import * as Actions from '../actions/twitterActionsTypes'

const initState = {
    followers: []
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case Actions.ADD_FOLLOWERS:
           return {
               ...state, followers: [...action.followers]
           };
        case Actions.UPDATE_FOLLOWERS:
            const updatedFollowers = [...state.followers, ...action.followers];
            return {
                ...state, followers: updatedFollowers
            };
        default:
            return state;
    }
};


export default reducer;