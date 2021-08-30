import Head from "next/head";
import { useState, useEffect } from "react";

import Axios from "axios";

import { Post } from "../types";

import PostCard from "../components/PostCard";

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
            <PostCard post={post} key={post.identifier} />
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
