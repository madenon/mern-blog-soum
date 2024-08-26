import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Modal, Textarea } from "flowbite-react";
import Comment from "../components/Comment";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function CommentSection({ postId }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const [commentToDelete, setCommentToDelete] = useState(null)
  const [commentError, setCommentError] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }

    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);

        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);







const  handleEdit = async(comment, editedContent) =>{
  setComments(
    comments.map((c)=>{
      c._id=== comment._id ? {...c, content:editedContent}:c
    })
  )

}


const handleDelete = async(commentId) =>{
  setShowModal(false)

  try {
    if(!currentUser){
      navigate("/sign-in")
      return ;
    }

    const res =  await fetch(`/api/comment/deleteComment/${commentId}`,{
      method:"DELETE"
    });
    if(res.ok){
      const data = await res.json()
        setComments(comments.filter((comment)=>comment._id !==commentId) )
    }
    
  } catch (error) {
    console.log(error.message)
    
  }

}


  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p className="">Connecté en tant que</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt=""
          />
          <Link
            className="text-xs text-cyan-600 hover:underline"
            to={"/dashboard?tab=profile"}
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="flex  gap-1 text-sm text-teal-500 my-5">
          Vous devez etre connecter pour pouvoir commenter les posts
          <Link
            className="text-xs text-cyan-600 hover:underline"
            to={"/sign-in"}
          >
            Se connecter
          </Link>
        </div>
      )}

      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 rounded-mdp-3"
        >
          <Textarea
            placeholder="ajouter votre commentaire"
            rows="3"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />

          <div className="flex justify-between items-center mt-8">
            <p className="text-gray-500 text-xs">
              {" "}
              {200 - comment.length} caractères Restante
            </p>
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

      {comments.length === 0 ? (
        <p className="text-sm my-5">Cet post n'a pas encore de commentaire</p>
      ) : (
        <>
          <div className='text-sm my-5 flex items-center gap-1'>
            <p>Commentaire</p>
            <div className='border border-gray-400 py-1 px-2 rounded-sm'>
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
               onEdit={handleEdit}
               onDelete={(commentId)=>{
                setShowModal(true)
                setCommentToDelete(commentId)
               }}

            />
          ))}
        </>
      )}


<Modal show={showModal} onClose={()=>setShowModal(false)}
popup size='md'
  > 
  <Modal.Header />
<Modal.Body>
  <div className="text-center">
    <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400
     dark:text-gray-200 mb-4 mx-auto" />
     <h3 className="mt-5 
     text-lg text-gray-500
      dark:text-gray-400">Êtes-vous sûr de vouloir supprimer ce commentaire ?</h3>
   <div className="flex justify-center gap-4">
   <Button color="failure" onClick={()=>handleDelete(commentToDelete)}>Oui</Button>
  <Button color="gray" onClick={()=>setShowModal(false)}>Non, Annuler</Button>
  
   </div>
  </div>
  </Modal.Body>
</Modal>
    </div>
  );
}
