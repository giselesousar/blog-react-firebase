import React, {useState, useEffect} from 'react';
import FirebaseService from '../Firebase/firebaseService';

export default function Posts(){
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        FirebaseService.getDataList('posts', (dataReceived) => setPostData(dataReceived))
    }) 
    return(
        <div>
            <h1>Posts</h1>
            <h3>Latest posts</h3>
            {postData.map(post => {
               return <p>{post}</p>
            })}
            <h3>pagination</h3>
        </div>
    )
}