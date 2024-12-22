import React, { useState, useEffect } from 'react'
import Container from '../components/container/Container'
import postSevice from '../appWrite/config'
import PostCard from '../components/PostCart'
import { useSelector } from 'react-redux'

function Home() {

    const [posts, setPosts] = useState([])
    const [loader, setLoader] = useState(true)

    const isLogedIn = useSelector(state => state.auth.status)

    useEffect(() => {
        postSevice.getPosts()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
        setLoader(false)
    }, [])


    if (isLogedIn) {
        return (
            !loader ? (<div>
                <Container>
                    {posts.map((post) => (
                        <div key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </Container>
            </div>) : (<>
                <h1 className='text-black text-2xl'>Loding...</h1>
            </>)
        )
    } else {
        return (
            <>
                <h1 className='text-red-600 font-semibold'>Login to See Posts</h1>
            </>
        )
    }

}


export default Home
