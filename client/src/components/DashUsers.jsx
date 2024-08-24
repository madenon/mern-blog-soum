import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";


export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [usersIdToDelete, setUserIdToDelete] = useState("");



  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if(data.users.length < 2000){
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);



const handleShowMore = async()=>{
  const startIndex = users.length;
try {
  const res =  await fetch(`/api/user/getusers?startIndex=${startIndex}`);


  const data = await res.json();
  if(res.ok){
    setUsers((preve)=>[...preve, ...data.users]);
    if(data.users.length < 2000){
      setShowMore(false)
    }

  }
  
} catch (error) {
  
  console.log(error.message)
}
}


const handelDeleteUser = async()=>{
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
    <div
      className="table-auto  overflow-scroll md:mx-auto p-3 scrollbar
    scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
    >
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date de Création</Table.HeadCell>
              <Table.HeadCell>Photo de l'utilisateur</Table.HeadCell>
              <Table.HeadCell>Nom utilisateur</Table.HeadCell>
              <Table.HeadCell>Email utilisateur</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Supprimer </Table.HeadCell>
            </Table.Head>

            {users.map((user_item) => (
              <Table.Body className="divide-y-0" key={user_item._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:text-gray-800">
                  <Table.Cell>
                    {new Date(user_item.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={user_item.profilePicture}
                      alt={user_item.name}
                      className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                    />
                  </Table.Cell>

                  <Table.Cell>{user_item.username}</Table.Cell>
                  <Table.Cell>{user_item.email}</Table.Cell>
                  <Table.Cell>{user_item.isAdmin ? (<FaCheck  className="text-green-500"/>) : (<FaTimes className="text-red-500" />) }</Table.Cell>

                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user_item._id);
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
        <p>Vous n'avez pas d'itulisateurs </p>
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
              <Button color="failure" onClick={handelDeleteUser}>
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
