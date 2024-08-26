import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";


export default function DashComment() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [CommentIdToDelete, setCommentIdToDelete] = useState("");



  useEffect(() => {
    const fetchCommemts = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if(data.comments.length < 2000){
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
        fetchCommemts();
    }
  }, [currentUser._id]);



const handleShowMore = async()=>{
  const startIndex = comments.length;
try {
  const res =  await fetch(`/api/comment/getcomments?startIndex=${startIndex}`);


  const data = await res.json();
  if(res.ok){
    setComments((preve)=>[...preve, ...data.comments]);
    if(data.comments.length < 2000){
      setShowMore(false)
    }

  }
  
} catch (error) {
  
  console.log(error.message)
}
}


const handelDeleteComments = async()=>{
    setShowModal(false)
  try {
    
    const res = await fetch(`/api/comment/deleteComment/${CommentIdToDelete}`,{
      method:'DELETE',
    });
    const data = await res.json()
    if(res.ok){
      setComments((prev)=> 
        prev.filter((comment)=> comment._id !== CommentIdToDelete))
      setShowModal(false)
    }else{
      console.log(data.message)
    }

  } catch (error) {
    console.log(error.message)
  }
  

}
  return (
    <div
      className="table-auto  overflow-scroll md:mx-auto p-3 scrollbar
    scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
    >
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date de modification</Table.HeadCell>
              <Table.HeadCell>Contenu du  commentaire</Table.HeadCell>
              <Table.HeadCell></Table.HeadCell>
              <Table.HeadCell>Identifiant du post</Table.HeadCell>
              <Table.HeadCell>Identifiant utilisateur</Table.HeadCell>
              <Table.HeadCell>Supprimer </Table.HeadCell>
            </Table.Head>

            {comments.map((comment) => (
              <Table.Body className="divide-y-0" key={comment._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:text-gray-800">
                  <Table.Cell>
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    {comment.content}
                  </Table.Cell>

                  <Table.Cell></Table.Cell>
                  <Table.Cell>{comment.postId}</Table.Cell>
                  <Table.Cell>{comment.userId}</Table.Cell>

                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                      className="text-red-500 font-medium hover:underline cursor-pointer"
                    >
                      Supprimer
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>

          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Voir plus d'utilisateurs
            </button>
          )}
        </>
      ) : (
        <p>Vous n'avez pas commentaires </p>
      )}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle
              className="h-14 w-14 text-gray-400
     dark:text-gray-200 mb-4 mx-auto"
            />
            <h3
              className="mt-5 
     text-lg text-gray-500
      dark:text-gray-400"
            >
              Êtes-vous sûr de vouloir supprimer ce post ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handelDeleteComments}>
                Oui
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                Non, Annuler
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}


