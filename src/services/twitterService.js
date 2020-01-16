import axios from 'axios';

export const getFollowers = (accountName, cursor, isButtonEvent, callback) => {
    axios.get('http://localhost:8070?screen_name=' + accountName + '&cursor=' + cursor).then(res => {
        const users = res && res.data && res.data.users || [];
        return callback(res.data.next_cursor, getUsersList(users), isButtonEvent);
    }).catch(err => {
        console.log(err);
    });
};

export const sortFollowers = (followers, sortByAccount) => {
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
        name: user.name,
        location: user.location,
        screen_name: user.screen_name,
        profile_img: user.profile_image_url,
        followers_count: user.followers_count
    };
};

const dynamicSort = (property) => {
    let sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        let result = (a[property].toLowerCase() < b[property].toLowerCase()) ? -1 : (a[property].toLowerCase() > b[property].toLowerCase()) ? 1 : 0;
        return result * sortOrder;
    }
};





