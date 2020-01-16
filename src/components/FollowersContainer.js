import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import Follower from "./Follower";

const FollowersContainer = (props) => {

    const {twitterFollowers, cursor, loadMore} = props;

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-sm-8 col-lg-5">
                    <div className="list-group">
                        {twitterFollowers && twitterFollowers.length > 0 &&
                        <InfiniteScroll
                            initialLoad={false}
                            children={twitterFollowers}
                            pageStart={0}
                            loadMore={loadMore}
                            hasMore={cursor !== 0}
                            loader={<div className="loader">Loading more items...</div>}
                            useWindow={true}>
                            {twitterFollowers && twitterFollowers.length > 0 && twitterFollowers.map((follower, index) =>
                                <Follower follower={follower} index={index}/>)}
                        </InfiniteScroll>}
                    </div>
                </div>
            </div>
        </div>)
};

export default FollowersContainer;
