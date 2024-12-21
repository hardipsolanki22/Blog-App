import React, { useState, useEffect } from 'react'
import Container from '../components/container/Container'
import postSevice from '../appWrite/config'
import PostCard from '../components/PostCart'
import { useSelector } from 'react-redux'

function Home() {

    const [posts, setPosts] = useState([])

    const isLogedIn = useSelector(state => state.auth.status)

    console.log(`isLogedIn: ${isLogedIn}`);


    useEffect(() => {
        postSevice.getPosts()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
    }, [])


    if (isLogedIn) {
        return (
            (posts.length > 0) ? (<div>
                <Container>
                    {posts.map((post) => (
                        <div key={post}>
                            <PostCard post={post} />
                        </div>
                    ))}
                </Container>
            </div>) : (<div>
                <Container>
                    <h1 className='text-red-600'>No Posts Found</h1>
                </Container>
            </div>)
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
