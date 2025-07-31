import React from 'react'
import appwriteService from '../appwrite/config'
import {Service} from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({$id,title,featuredImage}) {
    return (
        <>
        <Link to={`/post/${$id} `} >
        <div className='bg-gray-100 rounded-xl w-full' >
            <div className="w-full  justify-center mb-4">
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl' />
                <h2 className='text-xl font-bold' >{title} </h2>
            </div>
        </div>
        
        </Link>
        </>
    )
}

export default PostCard
