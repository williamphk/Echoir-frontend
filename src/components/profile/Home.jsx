import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Loading from "../common/Loading";
import Post from "../posts/Post";
import Intro from "./Intro";
import Friends from "./Friends";
import SkeletonPost from "../posts/SkeletonPost";
import AddPost from "../posts/AddPost";

import { getUserPost, getFriendList } from "../../api";

const Home = ({
  user,
  setFriends,
  friends,
  isWorkClick,
  isEducationClick,
  isCityClick,
  setIsWorkClick,
  setIsEducationClick,
  setIsCityClick,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPostsLoading, setIsPostsLoading] = useState(true);

  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);

  const token = useSelector((state) => state.auth.token);

  const acceptOrDeleteCount = useSelector(
    (state) => state.friendRequest.acceptOrDeleteCount
  );
  const createOrUpdateCount = useSelector(
    (state) => state.post.createOrUpdateCount
  );

  const { userId } = useParams();

  useEffect(() => {
    const fetchUserPost = async () => {
      try {
        const fetchedPosts = await getUserPost(token, userId ?? user._id);
        setPosts(fetchedPosts.data.posts);
        setIsLoading(false);
        if (fetchedPosts.data.posts.length === 0) {
          setIsPostsLoading(false);
        }
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchUserPost();
  }, [token, userId, user._id, createOrUpdateCount]);

  useEffect(() => {
    const fetchFriend = async () => {
      try {
        const fetchedFriends = await getFriendList(token, userId ?? user._id);
        setFriends(fetchedFriends.data.friends);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchFriend();
  }, [token, userId, user._id, acceptOrDeleteCount]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-x-4 md:px-[5%] lg:px-[15%] pt-4 gap-4">
      <div className="md:w-[43%] w-full flex flex-col gap-4">
        <Intro
          user={user}
          userId={userId}
          isWorkClick={isWorkClick}
          isEducationClick={isEducationClick}
          isCityClick={isCityClick}
          setIsWorkClick={setIsWorkClick}
          setIsEducationClick={setIsEducationClick}
          setIsCityClick={setIsCityClick}
        />
        <Friends friends={friends} />
      </div>
      <div className="md:w-[57%] w-full">
        <div className="w-full bg-white rounded-lg shadow p-3 font-bold text-lg mb-4">
          Posts
        </div>
        <AddPost user={user} />
        {isPostsLoading ? (
          <div>
            {Array(5)
              .fill()
              .map((element, index) => (
                <SkeletonPost key={index} />
              ))}
          </div>
        ) : null}
        <div className={`${isPostsLoading && "hidden"}`}>
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
                setIsLoading={setIsPostsLoading}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
