import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";

import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import Link from "next/link";
import { Post, Sub } from "../types";

import PostCard from "../components/PostCard";
import { useAuthState } from "../context/auth";

export default function Home() {
  const [observedPost, setObservedPost] = useState('')
  // const { data: posts } = useSWR<Post[]>("/posts");
  const { data: topSubs } = useSWR<Sub[]>("/misc/top-subs");
  const { authenticated } = useAuthState()
  // console.log(topSubs)


  const { data, error, mutate, size: page, setSize: setPage, isValidating} = useSWRInfinite<Post[]>(index => `/posts?page=${index}`)

  const posts: Post[] = data ? [].concat(...data) : [];
  useEffect(() => {
    if(!posts || posts.length === 0) return

    const id = posts[posts.length -1].identifier
    if(id !== observedPost){
      setObservedPost(id)
      observeElement(document.getElementById(id))
    }
  }, [posts])

  const observeElement = (element: HTMLElement) => {
    if(!element) return
    const observer = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting === true){
        console.log('Reached bottom of post')
        setPage(page + 1)
        observer.unobserve(element)
      }
    }, { threshold: 1})
    observer.observe(element)
  }
  return (
    <Fragment>
      <Head>
        <title>reddit: the front page of the internet</title>
      </Head>
      <div className="container pt-4 flex">
        {/* Posts feed */}
        <div className="w-full md:w-160 px-4 md:p-0">
          {isValidating && <p className="text-lg text-center">Loading...</p>}
          {posts?.map((post) => ( 
            <PostCard post={post} key={post.identifier} mutate={mutate}/>
          ))}
          {isValidating && posts.length > 0 && <p className="text-lg text-center">Loading More...</p>}
        </div>
        {/* Sidebar */}
        <div className="hidden md:block ml-6 w-80">
          <div className="bg-white rounded">
            <div className="p-4 border-b-2">
              <div className="text-lg font-semibold text-center">
                Top Communities
              </div>
              <div>
                {topSubs?.map((sub) => (
                  <div
                    key={sub.name}
                    className="flex items-center px-4 py-2 text-xs border-b"
                  >
                    <Link href={`/r/${sub.name}`}>
                      <a>
                        <Image
                          src={sub.imageUrl}
                          className="rounded-full cursor-pointer"
                          alt="Sub"
                          width={(6 * 16) / 4}
                          height={(6 * 16) / 4}
                        />
                      </a>
                    </Link>
                    <Link href={`/r/${sub.name}`}>
                      <a className="ml-2 font-bold hover:cursor-pointer">
                        /r/{sub.name}
                      </a>
                    </Link>
                    <p className="ml-auto font-med">{sub.postCount}</p>
                  </div>
                ))}
              </div>
              {authenticated && (
                <div className="p-4 border-t-2">
                  <Link href="/subs/create">
                    <a className="w-full blue button px-2 py-1">Create Community</a>
                  </Link>
                </div>
              )}
              
            </div>
          </div>
        </div>
      </div>
    </Fragment>
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
