import React from 'react'

import M2 from '../assets/mdl.png'
const Nhl = () => {
  return (
    <div className='w-full bg-white py-16 px-4'>
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
           <img className='w-[400px] mx-auto "w-64 'src={M2} alt='/' sizes={30}></img>
         <div className='flex flex-col justify-center'>
        <p className='text-[#a0f3d9] font-bold'>Maison des ligues</p>
        <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Contexte:</h1>
        <p> La Maison des Ligues (M2L) a été créée pour servir de Conseil régional de Lorraine, en fournissant des services et des installations aux différentes ligues sportives régionales. Elle emploie une variété de personnel, notamment des employés du conseil régional, des employés directement employés par la M2L, des prestataires et des bénévoles. 
Afin de garantir la qualité de ses services, la M2L souhaite offrir des formations à ses employés. Pour répondre à ce besoin, la M2L a contacté l'entreprise WArnium pour construire un site web de formation.</p>
       <button className='text-[#a0f3d9] w-[200px] rounded-md font-medium my-6 mx-auto py-3 bg-black'>Accéder aux Formations</button>

       </div>
       </div>
    </div>
  )
}

export default Nhl
