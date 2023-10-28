import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Post from "./Post";
import SkeletonPost from "./SkeletonPost";
import AddPost from "./AddPost";

import { getNewsFeed } from "../../api";

const NewsFeed = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const createOrUpdateCount = useSelector(
    (state) => state.post.createOrUpdateCount
  );
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsFeed = async () => {
      try {
        const fetchedPosts = await getNewsFeed(token);
        setPosts(fetchedPosts.data.posts);
        if (fetchedPosts.data.posts.length === 0) setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchNewsFeed();
  }, [token, createOrUpdateCount]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container flex flex-col max-w-[660px] py-3 sm:pr-3">
      <AddPost user={user} />
      {isLoading ? (
        <div>
          {Array(5)
            .fill()
            .map((element, index) => (
              <SkeletonPost key={index} />
            ))}
        </div>
      ) : null}
      <div className={`${isLoading && "hidden"}`}>
        {posts.length === 0 ? (
          <div className="text-center text-gray-500 font-bold text-lg">
            No posts available
          </div>
        ) : (
          posts.map((post) => (
            <Post
              post={post}
              key={post._id}
              id={post._id}
              token={token}
              user={user}
              setIsLoading={setIsLoading}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NewsFeed;
