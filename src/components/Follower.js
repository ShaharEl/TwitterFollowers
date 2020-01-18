import React from "react";
import './Follower.css'

const Follower = (props) => {

    const {follower, index} = props;

    return (
        <div key={index} className="followerWrapper list-group-item d-flex justify-content-between align-items-center">
            <div className="image-parent">
            <img className="img-fluid" src={follower.profile_img} alt={follower.screen_name}/>
            </div>
            <div className="follower name">{follower.name}</div>
            <div className="follower screen">{follower.screen_name}</div>
            <div className="follower location">{follower.location}</div>
        </div>)
};

export default Follower;
