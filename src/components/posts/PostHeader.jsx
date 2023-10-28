import React from "react";

import FormattedDate from "../common/FormattedDate";
import PostMenu from "./PostMenu";
import ProfilePic from "../common/ProfilePic";
import UserName from "../common/UserName";

const PostHeader = ({ post, postId, token, user }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-x-2">
        <ProfilePic
          picture={post.user.profile.picture}
          id={post.user._id}
          className="w-10 h-10 object-cover rounded-full"
        />
        <div className="flex flex-col items-start">
          <UserName
            name={post.user.profile.fullName}
            id={post.user._id}
            className="font-bold hover:underline cursor-pointer"
          />

          <FormattedDate
            className="text-sm text-gray-500"
            date={new Date(post.createdAt)}
          ></FormattedDate>
        </div>
      </div>
      {user._id === post.user._id && <PostMenu postId={postId} token={token} />}
    </div>
  );
};

export default PostHeader;
