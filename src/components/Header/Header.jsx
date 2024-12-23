import React from 'react'
import Container from '../container/Container'
import LogoutBtn from './LogoutBtn'
import Logo from '../Logo'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'



function Header() {

  const navigate = useNavigate()
  const authStatus = useSelector((state) => state.auth?.status)



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
    <header className='w-full h-14 hidden md:block bg-green-400'>
        <nav className='flex justify-around items-center h-full'>
          <div>
            <Link to={'/'}>
              <Logo />
            </Link>
          </div>
          <ul className='flex justify-center items-center gap-4'>
            {
              navItems.map((item) => (
                item.active ? (
                  <li key={item.name}>
                    <button onClick={() => navigate(item.slug)}>
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
