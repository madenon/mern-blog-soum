import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToActions() {
  return (
        <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">

<div className='flex-1 justify-center flex flex-col'>
<h2 className='text-2xl'>je veux en savoir plus sur le post
    </h2>
    <p className='text-gray-500 my-2'>Consultez ces ressources </p>
    
    <Button className='rounded-tl-xl rounded-bl-none' gradientDuoTone='purpleToPink'>
       <a href="https://www.universite.korhogo" 
       target='_blank' rel='noopener noreferrer'>
       Vous pouvez consulter pour en savoir plus
       </a>
        </Button>
</div>
 <div className="p-7 flex-1">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd0V-CnwX7rAyJKYHO3jkwd1y8SKYxNiNBDw&s"
     alt="" />
 </div>
    </div>
  )
}
