

import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { signInStart,signInSuccess, signInFailure } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'


export default function Signin() {
  const [formData, setFormData] = useState({})
  //user vient de username du userSlice
  const {loading, error:errorMessage} = useSelector(state=>state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

const handleChange =(e)=>
  {setFormData({...formData, [e.target.id]:e.target.value.trim()})
};

const handleSubmit = async(e)=>{
  e.preventDefault();
  if(!formData.email || !formData.password ||email==="" ||password===""){
    return dispatch(signInFailure("S'il vous plait les champs sont obligatoire pour se connecter"))
  }
try {
 dispatch(signInStart())
  const res = await fetch("/api/auth/signin",{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(formData),
  });
  const  data = await res.json()
  if(data.success===false){
    dispatch(signInFailure(data.message))
  }
   if(res.ok){
    dispatch(signInSuccess(data))
    navigate("/")
   }
} catch (error) {
 dispatch(signInFailure(error.message))
  
}
}
   
  return (
    <div className='min-h-screen mt-20'>

<div className="flex p-3 max-w-3xl mx-auto 
flex-col md:flex-row md:items-center gap-5">
{/* le code gauch */}
  <div className="flex-1">
  <Link
        to="/"
        className="font-bold dark:text-white text-4xl"
      >
        <span
          className="px-2 py-1 
      bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-500 text-white"
        >
          Mon-Blogs
        </span>
        Blog
      </Link>

      <p className='text-sm mt-5'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora aliquam ipsa itaque unde fuga laborum quas vitae autem illo? Autem?
      </p>
  </div>

  {/* le code droit */}
  <div className="flex-1">
  <form className=" flex flex-col gap-4" onSubmit={handleSubmit}>
    

    <div>
      <Label value='Votre Email ' />
      <TextInput  type='email' placeholder='cisse-dt.dg@gmail.com '
      id='email' onChange={handleChange} />
    </div>

    <div>
      <Label value='Votre mot de passe' />
      <TextInput  type='password' placeholder='............'
      id='password' onChange={handleChange} />
    </div>
    <Button disabled={loading}  gradientDuoTone="purpleToPink" type='submit'>
{loading ? (
  <>
   <Spinner size="sm"/>
   <span className='pl-3'>Loading...</span>
  </>
 
):"Se connecter" }
    </Button>
  </form>
  <div className="flex gap-2 text-sm mt-5">
    <span>Vous n'avez pas de compte?</span>
    <Link to="/sign-up" className='text-blue-500'>S'inscrire</Link>
  </div>
  {errorMessage &&  (
      <Alert className='mt-5' color="failure">
        {errorMessage}
      </Alert>
    )
  }
  </div>
</div>
    </div>
  )
}
