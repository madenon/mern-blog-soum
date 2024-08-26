import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
export default function DashboardComponent() {
  const [users, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUser, setLastMonthUser] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/getusers?limit=5");
        const data = await res.json();
        if (res.ok) {
          setUser(data.users);
          setTotalUser(data.totalUser);
          setLastMonthUser(data.lastMonthUser);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=5");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getcomments?limit=5");
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchUser();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className=" flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">
                Totals Utilisateurs
              </h3>
            </div>
            <p className="text-2xl">{totalUser}</p>
            <HiOutlineUserGroup />
          </div>

          <div className="flex gap-2 text-sm">
            <span className="text-gray-500 flex items-center">
              <HiArrowNarrowUp
                className="bg-teal-600
               text-white rounded-full text-5xl p-3 shadow-lg"
              />
              {lastMonthUser}
            </span>
            <div className="text-gray-500">Le mois dernier</div>
          </div>
        </div>

        {/* post */}

        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className=" flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Totals Post</h3>
            </div>
            <p className="text-2xl">{totalPosts}</p>
            <HiOutlineUserGroup />
          </div>

          <div className="flex gap-2 text-sm">
            <span className="text-gray-500 flex items-center">
              <HiArrowNarrowUp
                className="bg-indigo-600
               text-white rounded-full text-5xl p-3 shadow-lg"
              />
              {lastMonthPosts}
            </span>
            <div className="text-gray-500">Le mois dernier</div>
          </div>
        </div>

        {/*  commentaire  */}

        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className=" flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">
                Totals Commentaire
              </h3>
            </div>
            <p className="text-2xl">{totalComments}</p>
            <HiOutlineUserGroup />
          </div>

          <div className="flex gap-2 text-sm">
            <span className="text-gray-500 flex items-center">
              <HiDocumentText
                className="bg-lime-600
               text-white rounded-full text-5xl p-3 shadow-lg"
              />
              {lastMonthComments}
            </span>
            <div className="text-gray-500">Le mois dernier</div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 py-3  mx-auto justify-center">
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2"> Les nouveaux utilisateurs</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to={"/dashboard?tab=users"}>Voir tout</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Image des utilisateurs</Table.HeadCell>
              <Table.HeadCell>Nom des utilisateurs</Table.HeadCell>
            </Table.Head>
            {users &&
              users.map((user) => (
                <Table.Body key={user._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt="utilisateur"
                        className="text-red-500 w-10 h-10 rounded-full bg-gray-500"
                      />
                    </Table.Cell>

                    <Table.Cell>{user.username}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        {/* Post */}

        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2"> Les nouveaux commentaire</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to={"/dashboard?tab=users"}>Voir tout</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Contenu du commentaire</Table.HeadCell>
              <Table.HeadCell>Identifiant utilisateur</Table.HeadCell>
            </Table.Head>
            {comments &&
              comments.map((comment) => (
                <Table.Body key={comment._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="w-96">
                      <p className="line-clamp-2">{comment.content}</p>
                    </Table.Cell>

                    <Table.Cell className="line-clamp-1">
                      {comment.userId}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        {/* Commentaire */}

        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2"> Les nouveaux Posts</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to={"/dashboard?tab=posts"}>Voir tout</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>La photo du post</Table.HeadCell>
              <Table.HeadCell>Titre du post</Table.HeadCell>
              <Table.HeadCell>La cetgorie du post</Table.HeadCell>
            </Table.Head>
            {posts &&
              posts.map((post) => (
                <Table.Body key={post._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      <img
                        src={post.image}
                        alt="image"
                        className="text-red-500 w-14 h-14 rounded-full bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell className="w-96">{post.title}</Table.Cell>
                    <Table.Cell className="5">{post.category}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
}
