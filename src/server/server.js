const express = require('express');
const Twitter = require('twitter');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
const port = 8070;

let client = new Twitter({
    consumer_key: 'fqlKy13NEa6uyxYd9R8RsqlkF',
    consumer_secret: 'yetqFsGm1VCRJrkYEPDL1Uxk20RHzTz2vJwgm1ktGE6ExnkN5p',
    access_token_key: '1217128686182371328-L24yYHrPHzTHfNAaXPrr7neeOQbLZl',
    access_token_secret: 'nQHmLjXEmzUA0tTNsQai1VB7SxOYUgwrBjbIcGgHchYRc'
});

const params = {
    count: 30,
    include_user_entities: false
};

app.get('/', (req, res) => {
    params.screen_name = req.query.screen_name;
    params.cursor = req.query.cursor;
    client.get('followers/list.json', params).then(data => {
        res.send(data);
    }).catch(e => {
        res.status(500).json({success: false, error: 'Sorry, error'});
    });
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});