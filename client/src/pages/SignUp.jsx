import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Aouth from '../components/Aouth'

export default function SignUp() {
  const [formData, setFormData] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
const handleChange =(e)=>
  {setFormData({...formData, [e.target.id]:e.target.value.trim()})
};
const handleSubmit = async(e)=>{
  if(!formData.username || !formData.email || !formData.password){
    setErrorMessage("Tout les champs sont requis")
  }
e.preventDefault();
try {
  setLoading(true)
  setErrorMessage(null)
  const res = await fetch("/api/auth/signup",{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(formData),
  });
  const  data = res.json()
  if(data.success===false){
    return setErrorMessage(data.message)
  }
  setLoading(false)
   if(res.ok){
    navigate("/sign-in")
   }
} catch (error) {
  setErrorMessage(error.message)
  setLoading(false)
  
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
      <Label value='Votre nom utilisateur'/>
      <TextInput  type='text' placeholder='Cisse Karim Diouf'
      id='username'  onChange={handleChange} />
    </div>

    <div>
      <Label value='Votre Email ' />
      <TextInput  type='email' placeholder='cisse-dt.dg@gmail.com '
      id='email' onChange={handleChange} />
    </div>

    <div>
      <Label value='Votre mot de passe' />
      <TextInput  type='password' placeholder='Ciise@rtybqg'
      id='password' onChange={handleChange} />
    </div>
    <Button disabled={loading}  gradientDuoTone="purpleToPink" type='submit'>
{loading ? (
  <>
   <Spinner size="sm"/>
   <span className='pl-3'>Loading...</span>
  </>
 
):"S'inscrire" }
    </Button>
    <Aouth/>
  </form>
  <div className="flex gap-2 text-sm mt-5">
    <span>Avez-vous déjà un compte?</span>
    <Link to="/sign-in" className='text-blue-500'>Se connecter</Link>
  </div>
  {
    errorMessage &&  (
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
