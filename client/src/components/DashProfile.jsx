import { Button, TextInput } from 'flowbite-react'
import React from 'react'
import { useSelector } from 'react-redux'
export default function DashProfile() {
  const {currentUser} = useSelector(state=>state.user)
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
<h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
<form className="flex flex-col gap-4">
<div className='w-32 h-32 rounded-full shadow-md overflow-hidden self-center cursor-pointer'>
<img className='rounded-full
 w-full h-full object-cover border-8 border-[lightgry]'
 src={currentUser.profilePicture} alt="user" />

</div>
<TextInput type='text' id='username'  
placeholder="Nom d'utilisateur" defaultValue={currentUser.username}/>
<TextInput type='email' id='email'  
placeholder="Email d'utilisateur" defaultValue={currentUser.email}/>
<TextInput type='password' id='email'  
placeholder="**********"/>
<Button type='submit' gradientDuoTone='purpleToBlue' outline>
Mettre  à jour le profile
</Button>
</form>

<div className="text-red-500 flex justify-between mt-5">
  <span className='cursor-pointer'>Supprimer le compte</span>
  <span className='cursor-pointer'>Deconnecter le compte</span>
</div>
    </div>
  )
}
