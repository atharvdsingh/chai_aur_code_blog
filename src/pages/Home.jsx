import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'

function Home() {
    const [post,setPost]=useState([])
    useEffect(()=>{
        const data=appwriteService.getPosts().then((posts)=>{
            if(posts){
                setPost(posts.documents)
            }
        })
    },[])


    if(length(post === 0)){
        return (
            <Container>
                <div> login to read post </div>
            </Container>
        )
    }
    return(
        <div className="w-full py-8">
            <Container>
                <div className='flex flex-wrap' >
                    {post.map((post)=>(
                        <div key={post.$id} className='p-2 w-1/4' >
                            <PostCard  {...post} />
                        </div>
                    )
                    
                    )}

                </div>
            </Container>

        </div>
    )
}

export default Home
