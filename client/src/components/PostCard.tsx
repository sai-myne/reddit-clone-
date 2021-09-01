import dayjs from "dayjs";
import Link from "next/link";
import { Fragment } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import { Post } from "../types";
import Axios from "axios";
import classNames from "classnames";

interface PostCardProps {
  post: Post;
}

dayjs.extend(relativeTime);

const ActionButton = ({ children }) => {
  return (
    <div className="px-1 py-1 mr-1 text-gray-400 rounded cursor-pointer hover:bg-gray-200 text-xs">
      {children}
    </div>
  );
};
export default function PostCard({
  post: {
    identifier,
    slug,
    title,
    body,
    subName,
    createdAt,
    voteScore,
    userVote,
    commentCount,
    url,
    username,
  },
}: PostCardProps) {
  const vote = async (value) => {
    try {
      const res = await Axios.post("/misc/vote", {
        identifier,
        slug,
        value,
      });

      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div key={identifier} className="flex mb-4 bg-white rounded">
      {/* Vote section */}
      <div className="w-10 py-3 text-center bg-gray-200 rounded-l">
        {/* Upvote */}
        <div
          className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500"
          onClick={() => vote(1)}
        >
          <i
            className={classNames("icon-arrow-up", {
              "text-red-500": userVote === 1,
            })}
          ></i>
        </div>
        <p className="text-xs font-bold">{voteScore}</p>
        {/* Downvote */}
        <div
          className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-600"
          onClick={() => vote(-1)}
        >
          <i
            className={classNames("icon-arrow-down", {
              "text-blue-600": userVote === -1,
            })}
          ></i>
        </div>
      </div>
      {/* Post data section */}
      <div className="w-full p-2">
        <div className="flex items-center">
          <Link href={`/r/${subName}`}>
            <img
              src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
              className="w-6 h-6 mr-1 rounded-full cursor-pointer"
            />
          </Link>
          <Link href={`/r/${subName}`}>
            <a
              href=""
              className="text-xs font-bold hover:underline cursor-pointer"
            >
              /r/{subName}
            </a>
          </Link>
          <p className="text-xs text-gray-600">
            <span className="mx-1">•</span> Posted by
            <Link href={`/u/${username}`}>
              <a className="mx-1 hover:underline">/u/{username}</a>
            </Link>
            <Link href={url}>
              <a href="" className="mx-1 hover:underline">
                {dayjs(createdAt).fromNow()}
              </a>
            </Link>
          </p>
        </div>
        <Link href={url}>
          <a className="my-1 text-lg font-medium">{title}</a>
        </Link>
        {body && <p className="my-1 text-sm">{body}</p>}
        <div className="flex">
          <Link href={url}>
            <a>
              <ActionButton>
                <i className="mr-1 fas fa-comment-alt fa-xs">
                  <span className="font-bold ml-1">
                    {commentCount} Comments
                  </span>
                </i>
              </ActionButton>
            </a>
          </Link>
          <ActionButton>
            <i className="mr-1 fas fa-share fa-xs">
              <span className="font-bold ml-1">Share</span>
            </i>
          </ActionButton>
          <ActionButton>
            <i className="mr-1 fas fa-bookmark fa-xs">
              <span className="font-bold ml-1">Save</span>
            </i>
          </ActionButton>
        </div>
      </div>
    </div>
  );
}