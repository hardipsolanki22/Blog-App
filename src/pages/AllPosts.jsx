import React, { useEffect, useState } from 'react'
import Container from '../components/container/Container'
import postService from '../appWrite/config'
import PostCart from '../components/PostCart'

function AllPosts() {

    const [posts, setPosts] = useState([])
    const [loader, setLoader] = useState(true)


    useEffect(() => {
        postService.getPosts([])
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
            .finally(() => setLoader(false))
    }, [])

    return !loader ? (

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
    ) : (<>
        <h1 className='text-black font-semibold text-center m-4'>Loading...</h1>
    </>)
}

export default AllPosts
