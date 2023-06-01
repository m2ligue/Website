import React from 'react'

export default function SignUpModal() {
  return (
    <div className='fixed top-0 w-screen h-screen'>


        <div className='w-100 h-100 bg-gradient-to-b from-blue-400 to-green-200 bg-opacity-75' >

            <div className='absolute top-50 start-50 transform -translate-y-1/2 h-screen' style={{ minWidth: "400px"}}>

             <div className='modal-dialog'> 
             
             <div className='modal-content'> 

             <div className='modal-header'> 
             
             <h5 className='modal-title'>Sign Up   </h5>
             <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md">
  Fermer
</button>
             
             </div>
             </div>
             
             
             </div>

 
            </div>
        </div>
      
    </div>
  )
}
