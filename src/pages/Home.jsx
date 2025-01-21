import React, { useState, useEffect } from 'react'
import Container from '../components/container/Container'
import postSevice from '../appWrite/config'
import PostCart from '../components/PostCart'
import { useSelector } from 'react-redux'

function Home() {

    const [posts, setPosts] = useState([])
    const [loader, setLoader] = useState(true)

    const isLogedIn = useSelector(state => state.auth.status)

    useEffect(() => {
        setLoader(true)
        postSevice.getPosts()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
            .finally(() => setLoader(false))
    }, [])


    if (isLogedIn) {
        return (
            !loader ? (
            <div className='w-full flex justify-center items-center mx-auto'>
                <Container>
                   <div className='flex flex-col md:flex-row justify-center items-center p-4'>
                   {posts.map((post) => (
                        <div key={post.$id} className='h-auto w-full m-4 flex justify-center items-center'>
                            <PostCart {...post} />
                        </div>
                    ))}
                   </div>
                </Container>
            </div>
           
        ) : (<div>
                <h1 className='text-black font-semibold text-center m-4'>Loding...</h1>
            </div>)
        )
    } else {
        return (
            <div className='h-screen overflow-y-auto flex justify-center items-center'>
                <h1 className='text-red-600 font-semibold text-center m-4'>Login to See Posts</h1>
            </div>
        )
    }

}


export default Home
