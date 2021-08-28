import Head from "next/head";
import { useState, useEffect, Fragment } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Axios from "axios";
import { GetServerSideProps } from "next";

import { Post } from "../types";
import Link from "next/link";

dayjs.extend(relativeTime);

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    Axios.get("/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="pt-12">
      <Head>
        <title>reddit: the front page of the internet</title>
      </Head>
      <div className="container pt-4 flex">
        {/* Posts feed */}
        <div className="w-160">
          {posts?.map((post) => (
            <div key={post.identifier} className="flex mb-4 bg-white rounded">
              {/* Vote section */}
              <div className="w-10 text-center bg-gray-200 rounded-l">
                <p>V</p>
              </div>
              {/* Post data section */}
              <div className="w-full p-2">
                <div className="flex items-center">
                  <Link href={`/r/${post.subName}`}>
                    <Fragment>
                      <img
                        src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                        className="w-6 h-6 mr-1 rounded-full cursor-pointer"
                      />
                      <a
                        href=""
                        className="text-xs font-bold hover:underline cursor-pointer"
                      >
                        /r/{post.subName}
                      </a>
                    </Fragment>
                  </Link>
                  <p className="text-xs text-gray-600">
                    <span className="mx-1">•</span> Posted by
                    <Link href={`/u/${post.username}`}>
                      <a className="mx-1 hover:underline">/u/{post.username}</a>
                    </Link>
                    <Link href={post.url}>
                      <a href="" className="mx-1 hover:underline">
                        {dayjs(post.createdAt).fromNow()}
                      </a>
                    </Link>
                  </p>
                </div>
                <Link href={post.url}>
                  <a className="my-1 text-lg font-medium">{post.title}</a>
                </Link>
                {post.body && <p className="my-1 text-sm">{post.body}</p>}
                <div className="flex">
                  <Link href={post.url}>
                    <a>
                      <div className="px-1 py-1 mr-1 text-gray-400 rounded cursor-pointer hover:bg-gray-200 text-xs">
                        <i className="mr-1 fas fa-comment-alt fa-xs">
                          <span className="font-bold ml-1">20 Comments</span>
                        </i>
                      </div>
                    </a>
                  </Link>
                  <div className="px-1 py-1 mr-1 text-gray-400 rounded cursor-pointer hover:bg-gray-200 text-xs">
                    <i className="mr-1 fas fa-share fa-xs">
                      <span className="font-bold ml-1">Share</span>
                    </i>
                  </div>
                  <div className="px-1 py-1 mr-1 text-gray-400 rounded cursor-pointer hover:bg-gray-200 text-xs">
                    <i className="mr-1 fas fa-bookmark fa-xs">
                      <span className="font-bold ml-1">Save</span>
                    </i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Sidebar */}
      </div>
    </div>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   try {
//     const res = await Axios.get('/posts')

//     return { props: { posts: res.data } }
//   } catch (err) {
//     return { props: { error: 'Something went wrong' } }
//   }
// }
