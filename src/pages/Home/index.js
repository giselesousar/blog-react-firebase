import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import FirebaseService from '../Firebase/firebaseService';

export default function Home(){
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        FirebaseService.getDataList('posts', (dataReceived) => setPostData(dataReceived))
    }) 
    return(
        <div>
            <h1>Home</h1>
            <h3>Latest posts</h3>
            {postData.map(post => {
               return <p>{post}</p>
            })}
            <Link to='/posts'>See all</Link>
        </div>
    )
}