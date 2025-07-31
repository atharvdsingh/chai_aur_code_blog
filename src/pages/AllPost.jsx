import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { PostCard,Container } from '../components'

function AllPost() {
    const [posts,setPosts]=useState([])
    useEffect(()=>{
        appwriteService.getPosts([]).then((post)=>{
            if(post){
                setPosts(post.documents)
            }
        })
    },[])
    return (
            <>
            <div className="w-full py-8">
                <Container>
                    <div className='flex flex-wrap' >
                        {posts.map((post)=>
                        <div className='p-2 w-1/4' key={post.$id} >
                            <PostCard post={post} />
                        </div>
                        )}
                    </div>
                </Container>
            </div>
            </>
    )
}

export default AllPost
