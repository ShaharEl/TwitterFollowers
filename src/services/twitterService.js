import axios from 'axios';

export const getFollowers = (accountName, cursor, callback) => {
    axios.get('http://localhost:8070?screen_name=' + accountName + '&cursor=' + cursor).then(res => {
        const users = res && res.data && res.data.users || [];
        return callback(res.data.next_cursor, getUsersList(users));
    }).catch(err => {
        console.log(err);
    });
};

const getUsersList = (users) => {
    if (users.length === 0) return [];
    else {
        return users.reduce((accumalator, user) => {
            accumalator.push(extractUserObject(user));
            return accumalator;
        }, []);
    }
};

const extractUserObject = (user) => {
    return {
        name: user.name,
        location: user.location,
        screen_name: user.screen_name,
        profile_img: user.profile_image_url,
        followers_count: user.followers_count
    };
};




