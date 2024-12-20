import React, { useEffect, useState } from 'react'
import appWriteService from '../appWrite/config'
import { Link, useSearchParams } from 'react-router-dom'

export default function PostCart({ $id, title, featureImage }) {

    const [imageUrl, setImageUrl] = useState('')
    appWriteService.getFilePreview(featureImage)
        .then((url) => setImageUrl(url))


    return (
        <Link to={`/posts/${$id}`}>
            <div>
                <div>
                    <img src={imageUrl} alt={title} />
                </div>
                <h2>{title}</h2>
            </div>

        </Link>
    )
}
