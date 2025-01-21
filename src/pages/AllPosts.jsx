import React, { useEffect, useState } from 'react'
import Container from '../components/container/Container'
import postService from '../appWrite/config'
import PostCart from '../components/PostCart'
import conf from '../envImport/conf'

function AllPosts() {

    const [posts, setPosts] = useState([])
    const [loader, setLoader] = useState(true)

    console.log('appurl: ', JSON.stringify(conf.appWriteUrl));
    console.log('projectId: ', JSON.stringify(conf.appWriteProjectId));
    console.log('collectId ', JSON.stringify(conf.appWriteCollectionId));
    console.log('databaseId: ', JSON.stringify(conf.appWriteDataBaseId));
    console.log('bucketId: ', JSON.stringify(conf.appWriteBucketId));
    

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

        <div className='w-full min-h-screen flex justify-center items-center mx-auto'>
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
