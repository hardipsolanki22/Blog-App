import React from 'react'
import { Link,NavLink } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className="w-screen  bg-slate-500 px-4 py-6 h-auto flex
    justify-center flex-col md:flex-row md:justify-around 
    items-center flex-wrap border-t-2 border-black"
   >
       <div className="w-auto flex flex-col justify-between h-full ">
           <div className="w-36">
              <Logo width={'100px'} />
           </div>
           <div className="px-4">
               <p>Copyright 2024. All Rights Reserved by DevUI.</p>
           </div>
       </div>


       <div className=" flex flex-col md:flex-row items-center justify-center
        text-black gap-4 md:gap-12 lg:gap-32">
           <div>
               <p className="font-bold text-slate-300">COMPANY</p>
               <ul className="text-lg font-semibold">
                   <li>
                       <Link
                           to={'/'}
                           className="
                        text-base
                         font-medium
                         text-gray-900
                          hover:text-gray-600"
                       >
                           Features
                       </Link>
                   </li>
                   <li>
                       <Link
                           to={'/'}
                           className="
                        text-base 
                        font-medium
                         text-gray-900
                          hover:text-gray-600"
                       >
                           Pricing
                       </Link>
                   </li>
                   <li>
                       <Link
                           to={'/'}
                           className="
                        text-base 
                        font-medium
                         text-gray-900
                          hover:text-gray-600"
                       >
                           Affiliate Program
                       </Link>
                   </li>
                   <li>
                       <Link
                           to={'/'}
                           className="
                        text-base 
                        font-medium
                         text-gray-900
                          hover:text-gray-600"
                       >
                           Press Kit
                       </Link>
                   </li>
               </ul>
           </div>
           <div>
               <p className="font-bold text-slate-300">SUPPORT</p>
               <ul className="text-lg font-semibold">
                   <li>
                       <Link
                           to={'/'}
                           className="
                        text-base 
                        font-medium
                         text-gray-900
                          hover:text-gray-600"
                       >
                           Account
                       </Link>
                   </li>
                   <li>
                       <Link
                           to={'/'}
                           className="
                        text-base 
                        font-medium
                         text-gray-900
                          hover:text-gray-600"
                       >
                           Help
                       </Link>
                   </li>
                   <li>
                       <Link
                           to={'/'}
                           className="
                        text-base 
                        font-medium
                         text-gray-900
                          hover:text-gray-600"
                       >
                           Contact Us
                       </Link>
                   </li>
                   <li>
                       <Link
                           to={'/'}
                           className="
                        text-base 
                        font-medium
                         text-gray-900
                          hover:text-gray-600"
                       >
                           Customer Support
                       </Link>
                   </li>
               </ul>
           </div>
           <div>
               <p className="font-bold text-slate-300">LEGALS</p>
               <ul className="text-lg font-semibold">
                   <li>
                       <Link
                           to={'/'}
                           className="
                        text-base 
                        font-medium
                         text-gray-900
                          hover:text-gray-600"
                       >
                           Terms & Conditions
                       </Link>
                   </li>
                   <li>
                       <Link
                           to={'/'}
                           className="
                        text-base 
                        font-medium
                         text-gray-900
                          hover:text-gray-600"
                       >
                           Privacy Policy
                       </Link>
                   </li>
                   <li>
                       <Link
                           to={'/'}
                           className="
                        text-base 
                        font-medium
                         text-gray-900
                          hover:text-gray-600"
                       >
                           Licensing
                       </Link>
                   </li>
                   <li>
                       <Link
                           to={'/'}
                           className="
                        text-base 
                        font-medium
                         text-gray-900
                          hover:text-gray-600"
                       >
                           Copyright
                       </Link>
                   </li>
               </ul>
           </div>

       </div>
   </footer>
  )
}

export default Footer
