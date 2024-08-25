import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Textarea } from "flowbite-react";
import Comment from "../components/Comment";

export default function CommentSection({ postId }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);



const  handleSubmit = async(e) =>{
  e.preventDefault();
  if(comment.length >200){
    return;
  }

  try {
  const res = await fetch('/api/comment/create',{
    method:'POST',
    headers:{
  'Content-Type':'application/json'
    },
    body:JSON.stringify({content:comment,postId, userId:currentUser._id})
  });
  const data = await res.json()
  if(res.ok){
    setComment('')
    setCommentError(null)

  }
}catch{
  setCommentError(error.message)
}

}

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p className="">
            Connecté en tant que
          </p>
          <img className="h-5 w-5 object-cover rounded-full" src={currentUser.profilePicture} alt="" />
          <Link className="text-xs text-cyan-600 hover:underline"
           to={"/dashboard?tab=profile"}>@{currentUser.username}</Link>
        </div>
      ) : (
        <div className="flex  gap-1 text-sm text-teal-500 my-5">
          Vous devez etre connecter pour pouvoir commenter les posts
          <Link className="text-xs text-cyan-600 hover:underline"  to={"/sign-in"}></Link>
        </div>
      )}

      {currentUser  && (
        <form  onSubmit={handleSubmit} className="border border-teal-500 rounded-mdp-3">
          <Textarea 
          placeholder="ajouter votre commentaire"
          rows="3"
          maxLength="200"
          onChange={(e) =>setComment(e.target.value)}
          value={comment}
          
          />

          <div className="flex justify-between items-center mt-5">
         <p className="text-gray-500 text-xs">  {200 - comment.length}  caractères Restante</p>
          <Button type="submit" outline gradientDuoTone="purpleToBlue">
              Envoyer
            </Button>
            
          </div>
          {commentError && (
            <Alert className="mt-5" color="failure">

            {commentError}
          </Alert>
          )}
        </form>
        

      )}

    </div>
  );
}
