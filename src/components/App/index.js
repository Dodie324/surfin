import React from "react";
import { SearchBar, VideoList } from "../../containers";
import withInfiniteScroll from "../../HOC/withInfiniteScroll";

const InfiniteVideoList = withInfiniteScroll(VideoList);

export default () => (
  <div>
    <SearchBar />
    <InfiniteVideoList />
  </div>
);
