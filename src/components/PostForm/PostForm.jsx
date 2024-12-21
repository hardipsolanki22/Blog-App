import React, { useState } from 'react'
import Input from '../Input'
import Button from '../Button'
import Select from '../Select'
import postService from '../../appWrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({ post }) {

    const userData = useSelector(state => state.auth.status)
    const navigate = useNavigate()
    const [values, setValues] = useState({})
    const [error, setEror] = useState("")

    const handleChange = (e) => {
        const { name, value, files} = e.target        

        if (name === "featuredimage" && files) {
            setValues({
                ...values,
                [name]: files[0]
            })
           
        } else {
            setValues({
                ...values,
                [name]: value
            })
        }
    }

    console.log(`values: ${JSON.stringify(values)}`);



    const postHandler = async(e) => {
        console.log("|Clcik");
        
        e.preventDefault()
        if (post) {
            try {
                const data = {
                    title: post.title,
                    description: post.description,
                    status: post.status,
                    featuredimage: post.featuredimage
                }
                const file = values.featuredimage ? await postService.uploadFile(values.featuredimage) : null
                if (file) {
                    await postService.deleteFile(post.featuredimage)
                }
                const post = await postService.updatePost(post.$id, {
                    ...data,
                    featuredimage: file ? file.$id : post.$id
                }
                )
                if (post) {
                    navigate(`/posts/${post.$id}`)
                }
            } catch (error) {
                setEror(error)
            }

        } else {
            try {
                const fileUpload = values.featuredimage && await postService.uploadFile(values.featuredimage)
                const data = {
                    title: values.title,
                    description: values.description,
                    status: values.status,
                    featuredimage: values.featuredimage
                }
                if (fileUpload) {
                    const post = await postService.addPost({
                        ...data,
                        featuredimage: fileUpload.$id,
                        userId: userData.$id
                    })

                    if (post) {
                        navigate(`posts/${post.$id}`)
                    }
                }
            } catch (error) {
                setEror(error.message)
            }

        }




    }
    return (
        <div>
            <div>
                <h2>PostForm</h2>
                {error && <p className='text-red-600'>{error}</p>}
            </div>
            <form onSubmit={postHandler} method='post'>
                <Input
                    type="text"
                    placeholder="Enter Title"
                    name="title"
                    label="Title: "
                    value={post ? post.title : values.title}
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    placeholder="Enter Description"
                    name="description"
                    label="Descripiton: "
                    value={post ? post.description : values.description}
                    onChange={handleChange}
                />
                {post &&
                    <img
                        src={postService.getFilePreview(post.featuredimage)}
                        alt={postService.getFilePreview(post.title)}
                    />
                }
                <Input
                    type="file"
                    name="featuredimage"
                    label="FeaturedImage: "
                    accept="image/png, image.gpeg image/jpg image/gif"
                    onChange={handleChange}
                />
                <Select
                    opations={["active", "inactive"]}
                    label="Status: "
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                />
                <button type='submit' onClick={postHandler}>
                    {post ? "Update" : "Submit"}
                </button>
            </form>
        </div>
    )
}

export default PostForm
