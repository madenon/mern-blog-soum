import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPost] = useState([]);
  console.log(userPosts);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getpost?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPost(data.posts);
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
                   
                      <span className="text-red-500 font-medium hover:underline cursor-pointer">Supprimer</span>
                
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
        </>
      ) : (
        <p>Vous navigator;avez pas de posts </p>
      )}
    </div>
  );
}
