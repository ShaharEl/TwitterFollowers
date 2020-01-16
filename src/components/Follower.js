import React from "react";
import './Follower.css'

const Follower = (props) => {

    const {follower, index} = props;

    return (
        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <div className="image-parent">
            <img className="img-fluid" src={follower.profile_img}/>
            </div>
            <div className="follower name">{follower.name}</div>
            <div className="follower screen">{follower.screen_name}</div>
            <div className="follower location">{follower.location}</div>
        </li>)
};

export default Follower;
