import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import Follower from "./Follower";
import Loader from "../components/generic/Loader"

const FollowersContainer = (props) => {

    const {twitterFollowers, cursor, loadMore, loadingResults} = props;

    return (
        <div id="followersContainer" className="container">
            <div className="row">
                <div className="col-12 col-sm-8 col-lg-5">
                    <ul className="list-group">
                        {twitterFollowers && twitterFollowers.length > 0 &&
                        <InfiniteScroll
                            initialLoad={false}
                            children={twitterFollowers}
                            pageStart={0}
                            loadMore={loadMore}
                            hasMore={cursor !== 0 && !loadingResults}
                            loader={<Loader key={1}/>}>
                            {twitterFollowers.map((follower) => {
                                return <Follower key={follower.id.toString()} follower={follower}/>
                            })}
                        </InfiniteScroll>}
                    </ul>
                    <Loader/>
                </div>
            </div>
        </div>)
};

export default FollowersContainer;
