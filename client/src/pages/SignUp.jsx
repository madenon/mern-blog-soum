import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
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
  <form className=" flex flex-col gap-4">
    <div>
      <Label value='Votre nom utilisateur'/>
      <TextInput  type='text' placeholder='Cisse Karim Diouf'
      id='username' />
    </div>

    <div>
      <Label value='Votre Email '/>
      <TextInput  type='email' placeholder='cisse-dt.dg@gmail.com '
      id='email' />
    </div>

    <div>
      <Label value='Votre mot de passe'/>
      <TextInput  type='password' placeholder='Ciise@rtybqg'
      id='password' />
    </div>
    <Button gradientDuoTone="purpleToPink" type='submit'>
        S'inscrire
    </Button>
  </form>
  <div className="flex gap-2 text-sm mt-5">
    <span>Avez-vous déjà un compte?</span>
    <Link to="/sign-in" className='text-blue-500'>Se connecter</Link>
  </div>
  </div>
</div>
    </div>
  )
}
