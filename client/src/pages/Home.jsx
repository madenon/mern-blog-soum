import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallToActions from "../components/CallToActions";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getposts");
      const data = await res.json();
      setPosts(data.posts);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6 p-28  px-3 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">
          Bienvenu sur notre site d'information{" "}
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Le qui vous permetre d'etre à tout le temps{" "}
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          voir tout les posts
        </Link>
      </div>
      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToActions />
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2
              className="text-2xl 
            font-semibold text-center"
            >
              Les posts les plus recents
            </h2>

            <div className="flex flex-wrap gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link to={"/search"} className="text-lg  text-teal-500 hover:underline text-center">
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
