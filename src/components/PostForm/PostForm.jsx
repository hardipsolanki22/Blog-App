import React, { useState ,useEffect} from 'react'
import Input from '../Input'
import Button from '../Button'
import Select from '../Select'
import postService from '../../appWrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({ post }) {

    const userData = useSelector(state => state.auth.userData)
    const navigate = useNavigate()
    const [error, setEror] = useState("")
    const [fileUrl, setFileUrl] = useState(post && post.featuredimage && postService.getFilePreview(post?.featuredimage));
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        content: "",
        status: "active",
        featuredimage: null,
        userId: userData ? userData.$id : ""
    })
    
    
        useEffect(() => {
            if (post) {
                setFormData({
                    title: post.title || "",
                    slug: post.slug || "",
                    content: post.content || "",
                    status: post.status || "active",
                    featuredimage: post.featuredimage || null,
                    userId: userData ? userData.$id : ""
                })
            }
        }, [post, userData])


    
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            const file = files[0];
            setFormData((prevValues) => ({
                ...prevValues,
                [name]: file
            }));
            setFileUrl(file);
        } else {
            setFormData((prevValues) => ({
                ...prevValues,
                [name]: value
            }));
        }
        if (name === 'title') {
            setFormData((prevValues) => ({
                ...prevValues,
                 slug: value
                 .toLocaleLowerCase()
                 .replace(/\s+/g, "-") 
            }));
        }
    };

    console.log(`formData: ${JSON.stringify(formData)}`);
    console.log(`fileUrl: ${fileUrl}`);


    const postHandler = async (e) => {
        console.log("|Clcik");
        e.preventDefault()
        if (post) {
            try {
                const data = {
                    title: post.title,
                    slug: post.slug,
                    content: post.content,
                    status: post.status,
                    featuredimage: post.featuredimage
                }
                const file = fileUrl && await postService.uploadFile(fileUrl)
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
                const data = {
                    title: formData.title,
                    slug: formData.slug,
                    content: formData.content,
                    status: formData.status,
                    featuredimage: formData.featuredimage
                }

                const fileUpload = fileUrl && await postService.uploadFile(fileUrl)
                if (fileUpload) {
                    const post = await postService.createPost({
                        ...data,
                        featuredimage: fileUpload.$id,
                        userId: userData.$id
                    })
                    console.log(`fileUpload: ${fileUpload}`);
                    console.log(`PostCreate: ${post}`);

                    if (post) {
                        navigate("/")
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
                    value={formData.title}
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    placeholder="slug"
                    name="slug"
                    label="Slug: "
                    value={formData.slug}
                    readOnly={true}
                />
                <Input
                    type="text"
                    placeholder="Enter Description"
                    name="content"
                    label="Content: "
                    value={formData.content}
                    onChange={handleChange}
                />
                {fileUrl &&
                    <img
                        src={fileUrl}
                        alt={"Feartured"}
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
                    value={formData.status}
                    onChange={handleChange}
                />
                <Button type='submit' onClick={postHandler}>
                    {post ? "Update" : "Submit"}
                </Button>
            </form>
        </div>
    )
}

export default PostForm

