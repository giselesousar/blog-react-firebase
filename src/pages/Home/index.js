import React, {useState, useEffect} from 'react';
import FirebaseService from '../Firebase/firebaseService';
import {Container, Button} from 'react-bootstrap';
import CardComponent from '../components/Card';

export default function Home(){
    const [postData, setPostData] = useState([]);
    const [numberPosts, setNumberPosts] = useState(10);

    function handleShowMore(){
        setNumberPosts(numberPosts + 10);
    }

    useEffect(() => {
        FirebaseService.getDataList('posts', (dataReceived) => setPostData(dataReceived), numberPosts);
    }) 
    return(
        <Container>
            <h1>Home</h1>
            <h3>Latest posts</h3>
            {postData.map(post => {
            return (
             (post[4]) ? <CardComponent title={post[1]} content={post[2]} date={post[3]} visible={post[4]}/> : <></>
            )
         })}
            
            <Button onClick={handleShowMore}>Show more</Button>
        </Container>
    )
}