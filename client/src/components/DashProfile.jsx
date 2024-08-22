import { Alert, Button, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useDispatch } from "react-redux";
import { updateStart, updateSuccess, updateFailure } from "../redux/user/userSlice";


export default function DashProfile() {
  const [updateUserSuccess,setUpdateUserSuccess] =useState(null)
  const [imageFile, setImageFile] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploaProgress, setImageFileUploadProgess] = useState(false);
  const filePickerRef = useRef();
  const [updateUserError,setUpdateUserError] =useState(null)
  const dispatch = useDispatch()
const [formData , setFormData]= useState({})
const [imageFileUploading,setImageFileUploading] = useState(null)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {

    //  rules_version = '2';
    // Craft rules based on data in your Firestore database
    // allow write: if firestore.get(
    //    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write : if
    //       request.resource.size < 2 * 1024 * 1024 &&

    //       request.resource.contentType.matches('image/*')
    //     }
    //   }
    // }

    setImageFileUploading(true)
    setImageFileUploadProgess(null)
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgess(progress.toFixed(0));

      },
      (error) => {
        setImageFileUploadError("Erreur de telechargeent d'image");
         setImageFileUploadProgess(null)
         setImageFile(null)
         setImageFileUrl(null)
         setImageFileUploading(false)

      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({...formData, profilePicture: downloadURL})
         setImageFileUploading(false)
        });
      }
    );
  };

  const handleChange = (e)=>{
setFormData({...formData, [e.target.id]:e.target.value})

  };


  const handleSubmit = async(e)=>{
    setUpdateUserError(null)
    setUpdateUserSuccess(null)
    e.preventDefault()
    if(Object.keys(formData).length ===0){
      setUpdateUserError("Aucun changement n'a été fait")
      return ;
    }
    if(imageFileUploading){
      setUpdateUserError("Attentdez que l'image se charge")
      return
    }

    try {
       dispatch(updateStart());
       const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method:'put',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify(formData)
       })
       const data = await res.json();
       if(!res.ok){
         dispatch(updateFailure(data.message))
         setUpdateUserError(data.message)
       } else{
        dispatch(updateSuccess(data))
        setUpdateUserSuccess("Votre profile a bien été mise à jour avec succès")
       }
    } catch (error) {
      dispatch(updateFailure(error.message))
      setUpdateUserError(error.message)
      
    }
  }
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
       
        <div
          onClick={() => filePickerRef.current.click()}
          className="relative w-32 h-32 rounded-full shadow-md overflow-hidden self-center cursor-pointer"
        >
           {imageFileUploaProgress && (
          <CircularProgressbar value={imageFileUploaProgress || 0} 
          text={`${imageFileUploaProgress}%`}
          strokeWidth={5}
          styles={{
            root:{
              width:'100%',
              height:'100%',
              position:'absolute',
              top:0,
              left:0
            },
            path:{
              stroke:`rgb(62, 152, 199, ${imageFileUploaProgress / 100})`,
            },

          }}
          />
        )}
          <img
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgry] ${imageFileUploaProgress  && imageFileUploaProgress < 100 && 'opacity-60'}`}
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
          />
        </div>
        {imageFileUploadError && (
         <Alert color='failure'>{imageFileUploadError}</Alert>

        )}

        <TextInput
          type="text"
          id="username"
          placeholder="Nom d'utilisateur"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />

        <TextInput
          type="email"
          id="email"
          placeholder="Email d'utilisateur"
          defaultValue={currentUser.email}
          onChange={handleChange}

        />

        <TextInput type="password"
         id="password" placeholder="**********"
         onChange={handleChange}

         />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Mettre à jour le profile
        </Button>
      </form>

      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Supprimer le compte</span>
        <span className="cursor-pointer">Deconnecter le compte</span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">{updateUserSuccess}</Alert>
      )}
      {updateUserError &&(
        <Alert color='failure' className="mt-5">{updateUserError}</Alert>
      )}
    </div>
  );
}
