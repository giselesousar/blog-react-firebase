import React, {useState, useEffect} from 'react';
import FirebaseService from '../Firebase/firebaseService';

export default function Posts(){
    const [postData, setPostData] = useState([]);
    const [error, setError] = useState(null)

    useEffect(() => {
        FirebaseService.getDataList('posts', (dataReceived) => setPostData(dataReceived))
    }) 
    return(
        <div>
            <h1>Posts</h1>
            {postData.map(post => {
               return <p>{post}</p>
            })}
            {error && <p>{error}</p>}
        </div>
    )
}