import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/fr";
import { FaThumbsUp } from "react-icons/fa";

export default function Comment({ comment, onLike }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getUser();
  }, [comment]);
  return (
    <div>
      <div className="flex p-4 border-b dark:border-gray-600 text-sm">
        <img
          className="w-10 h-10 
    rounded-full bg-gray-200 flex-shrink-0 mr-3"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1  text-xs truncate">
            {user ? `@${user.username}` : "Utilisateur anonyme"}
          </span>
          {/* <span> */}
            {/* <span className="text-xs text-gray-500">
              {moment(comment.createdAt).format("MMMM Do YYYY HH:mm")}
            </span> */}
            <span className='text-gray-500 text-xs'>
            {moment(comment.createdAt).fromNow()}
          {/* </span> */}
          </span>
        </div>
        <p className="text-gray-500 pb-2">{comment.content}</p>
        <div className="">
          <button type='button' onClick={()=>onLike(comment._id)} 
          className="text-gray-400 hover:text-blue-500">
            <FaThumbsUp className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
}
