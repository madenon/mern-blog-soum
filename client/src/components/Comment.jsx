import React, { useEffect, useState } from "react";
import moment from "moment"


 import "moment/locale/fr"; 


export default function Comment({ comment }) {
    const [user, setUser] = useState({})
    console.log(user)
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json()
        if(res.ok){
            setUser(data)
        }
      } catch (error) {
        console.log(error.message)
      }
    };

    getUser();
  }, [comment]);
  return <div>
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
    <img className="w-10 h-10 
    rounded-full bg-gray-200 flex-shrink-0 mr-3" 
    src={user.profilePicture} alt={user.username} />
  </div>
    <div className="flex-1">
    <div className="flex items-center mb-1">
     <span className="font-bold mr-1  text-xs truncate">{user ? `@${user.username}`:"Utilisateur anonyme" }</span>
     <span>
        <span className="text-xs text-gray-500">{moment(comment.createdAt).format("MMMM Do YYYY HH:mm")}</span>
     </span>
  </div>
  <p className="text-gray-500 pb-2">{comment.content}</p>
    </div>

  </div>
}
