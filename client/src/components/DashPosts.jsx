import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPost] = useState([]);
  const [showMore, setShorMore] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [postIdToDelete, setPostIdToDelete] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPost(data.posts);
          if(data.posts.length < 9){
            setShorMore(false)
          }
          // posts vient du backend
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);



const handleShowMore = async()=>{
  setShorMore(true)
  const startIndex = userPosts.length;

try {
  const res =  await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
  const data = await  res.json();
  if(res.ok){
    setUserPost((preve)=>[...preve, ...data.posts]);
    if(data.posts.length < 9){
      setShorMore(false)
    }

  }
  
} catch (error) {
  
  console.log(error)
}
}


const handelDeletePost = async()=>{
  setShowModal(false)
  try {
    const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,{
      method:'DELETE',
    });
    const data = await res.json()
    if(!res.ok){
      console.log(data.message)
    }else{
      setUserPost((prev)=> 
      prev.filter((post)=> post._id !== postIdToDelete))
    }

  } catch (error) {
    console.log(error.message)
  }
  

}
  return (
    <div  className="table-auto  overflow-scroll md:mx-auto p-3 scrollbar
    scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date de modification</Table.HeadCell>
              <Table.HeadCell>Image du Post</Table.HeadCell>
              <Table.HeadCell>Titre du post</Table.HeadCell>
              <Table.HeadCell>Categorie du post</Table.HeadCell>
              <Table.HeadCell>Supprimer le post </Table.HeadCell>
              <Table.HeadCell>
                <span>Modifier</span>
              </Table.HeadCell>
            </Table.Head>

            {userPosts.map((post) => (
              <Table.Body className="divide-y-0">
                <Table.Row className="bg-white dark:border-gray-700 dark:text-gray-800">
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                  <Link  to={`/post/${post.slug}`}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-20 h-10 object-cover bg-gray-500"
                    />
                  </Link>
                  </Table.Cell>


                  <Table.Cell>
                    <Link className="text-gray-900 dark:text-white" to={`/post/${post.slug}`} >{post.title}</Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link  >{post.category}</Link>
                  </Table.Cell>

                  <Table.Cell>
                      <span 
                      onClick={()=>{
                        setShowModal(true);
                        setPostIdToDelete(post._id)

                      }}
                      className="text-red-500 font-medium hover:underline cursor-pointer">Supprimer</span>
                
                  </Table.Cell>

                  <Table.Cell>
                  
                      <Link className="text-teal-500 hover:underline" to={`/update-post/${post._id}`}>
                    <span>Modifier</span>
                    </Link>
                     
                 
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>

          {showMore  && (
            <button
             onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-7">Voir plus de post</button>
          )}
        </>
      ) : (
        <p>Vous n'avez pas de posts </p>
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
      dark:text-gray-400">Êtes-vous sûr de vouloir supprimer ce post ?</h3>
   <div className="flex justify-center gap-4">
   <Button color="failure" onClick={handelDeletePost}>Oui</Button>
  <Button color="gray" onClick={()=>setShowModal(false)}>Non, Annuler</Button>
  
   </div>
  </div>
  </Modal.Body>
</Modal>
    </div>
  );
}
