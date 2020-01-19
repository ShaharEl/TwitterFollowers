import axios from 'axios';
import {dynamicSort} from './utils'

export const getFollowers = (accountName, cursor, isButtonEvent) => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8070?screen_name=' + accountName + '&cursor=' + cursor).then(res => {
            const users = res && res.data && res.data.users || [];
            const response = {
                users: getUsersList(users),
                cursor: res.data.next_cursor,
                isButtonEvent
            };
            resolve(response);
        }).catch(err => {
            reject({error: true, messageKey: err.response.data.error});
        });
    });
};

export const sortFollowers = ({followers, sortByAccount}) => {
    return sortByAccount ? followers.sort(dynamicSort('name')) : followers.sort(dynamicSort('screen_name'));
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
        id: user.id,
        name: user.name,
        location: user.location,
        screen_name: user.screen_name,
        profile_img: user.profile_image_url,
        followers_count: user.followers_count
    };
};





