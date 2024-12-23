import React, { useState } from 'react'
import Container from '../container/Container'
import LogoutBtn from './LogoutBtn'
import Logo from '../Logo'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'



function Header() {

  const navigate = useNavigate()
  const authStatus = useSelector((state) => state.auth?.status)
  const [isOpen, setIsOpen] = useState(false)


  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: "signup",
      slug: "/signup",
      active: !authStatus
    },
    {
      name: "login",
      slug: "/login",
      active: !authStatus
    },
    {
      name: "addPost",
      slug: "/add-post",
      active: authStatus
    },
    {
      name: "allPosts",
      slug: "/all-posts",
      active: authStatus
    }
  ]

  return (
    <header className='w-full h-auto  bg-gray-400  border border-t-2 border-b-black '>
      <nav className='flex justify-end md:justify-around items-center md:h-16 h-12'>
        <div className='hidden md:block'>
          <Link to={'/'}>
            <Logo width='10px' />
          </Link>
        </div>
        <ul className='md:flex justify-end items-start gap-4 hidden'>
          {
            navItems.map((item) => (
              item.active ? (
                <li key={item.name}>
                  <button onClick={() => navigate(item.slug)}
                    className='duration-200 hover:bg-blue-100 rounded-full'>
                    {item.name}
                  </button>
                </li>
              ) : null
            ))}
          {
            authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )
          }
        </ul>
      </nav>
    </header>

  )
}

export default Header
