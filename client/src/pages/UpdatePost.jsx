import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { app } from "../firebase";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar } from "react-circular-progressbar";
import { useNavigate, useParams } from "react-router-dom";
import {useSelector} from "react-redux"
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();
  const {currentUser} = useSelector(state=>state.user)

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }

        if (res.ok) {
          setPublishError(null);
          setFormData(data.posts[0]);
        }
      };
      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageFileUploadError("Charger une image");
        return;
      }
      setImageFileUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageFileUploadError("échec de telechargement d'image");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageFileUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageFileUploadError("échec de telechargement d'image");
      setImageUploadProgress(null);
      console.log(error);
    }
  };
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Quelque s'est mal passé lors de lq publicqtion");
    }
  };
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-centertext-3xl my-7 font-semibold">
        Mettre à jour le post
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div
          className="flex flex-col gap-4
  sm:flex-row justify-between"
        >
          <TextInput
            type="text"
            placeholder="Le Titre"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category}

          >
            <option value="uncategorized">Selectioner une categorie</option>
            <option value="information">Information</option>
            <option value="projet">Les Projets</option>
            <option value="consil">Conseil</option>
            <option value="deplacement">Déplacement/Voyage</option>
            <option value="action">Les actions</option>
            <option value="autre">Autre</option>
          </Select>
        </div>
        <div
          className="flex gap-4 
 items-center justify-between
  border-4 border-teal-500 border-dotted p-3"
        >
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Charger une image"
            )}
          </Button>
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}

        {formData.image && (
          <img
            src={formData.image}
            alt="uploa"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          modules={modules}
          formats={formats}
          theme="snow"
          placeholder="Votre message ici"
          className="h-52 mb-12"
          required
          onChange={(value) => setFormData({ ...formData, content: value })}
          value={formData.content}

        />

        <TextInput
          type="text"
          placeholder="La source"
          required
          id="source"
          className="flex-1"
          value={formData.source}

          onChange={(e) => setFormData({ ...formData, source: e.target.value })}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publier la mise à jour
        </Button>
        <Button>
          {publishError && (
            <Alert className="mt-5" color="failure">
              {publishError}
            </Alert>
          )}
        </Button>
      </form>
    </div>
  );
}
