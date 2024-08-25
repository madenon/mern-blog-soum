import React, { useEffect, useState } from "react";
import "moment/locale/fr";
import { useSelector } from "react-redux";
import TimeAgo from "javascript-time-ago";
import moment from "moment";
import fr from "javascript-time-ago/locale/fr.json";
import "moment/locale/fr"; //always use French
import { Button, Textarea } from "flowbite-react";
TimeAgo.setDefaultLocale(fr.locale);
TimeAgo.addLocale(fr);
import { useNavigate } from "react-router-dom";
export default function Comment({ comment,onEdit,onDelete }) {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate()

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

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async()=>{
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`,{
         method:'PUT',
         headers:{
          'Content-Type':'application/json'
         },
         body:JSON.stringify({
          content:editedContent
         })
      });
      
      if(res.ok){
        setIsEditing(false)
        onEdit(comment, editedContent);
        navigate("/dashboard?tab=posts")

      }
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className="lfex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex shrink-0 mr-3">
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
          <span className="text-xs text-gray-500">
            {moment(comment.createdAt).format("MMMM Do YYYY HH:mm  ")}
          </span>
        </div>

        {isEditing ? (
          <>
            <Textarea
              className="mb-2"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-xs ">
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                onClick={handleSave}
              >sauvegarder</Button>
           
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                outline
                onClick={() =>setIsEditing(false)}
              >Annuler</Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 pb-2">{comment.content}</p>
            <div className="">
              {/* <button type='button' onClick={()=>onLike(comment._id)} 
          className={`text-gray-400 hover:text-blue-500
           ${currentUser && comment.likes.includes(currentUser._id) &&'!text-blue-500' }`}>
            <FaThumbsUp className="text-sm" />
          </button> */}

    {currentUser &&  (currentUser._id === comment.userId || currentUser.isAdmin) && (
                 <>
                  <div className="flex  p-4 gap-3">
                  <button
                    onClick={handleEdit}
                    type="button"
                    className="text-gray-400 hover:text-blue-500 gap-4"
                  >
                    Modifier
                  </button>


                <button
                    onClick={() =>onDelete(comment._id)}
                    type="button"
                    className="text-gray-400 hover:text-red-500 gap-4"
                  >
                    Supprimer 
                  </button>
                  </div>

                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
