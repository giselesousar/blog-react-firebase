import React, {useState, useEffect} from 'react';
import FirebaseService from '../Firebase/firebaseService';
import {Container, Button} from 'react-bootstrap';
import CardComponent from '../components/Card';
import Navbar from '../components/Navbar'
import './styles.css';


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
        <>
        <Navbar />
        <Container>
            <h3>Latest posts</h3>
            <Container style={{display: "inline"}}>
            {postData.map(post => {
            return (
            post[4] ? <CardComponent 
                        className="card" 
                        title={post[1]} 
                        content={post[2]} 
                        date={post[3]} 
                        visible={post[4]}
                    />
            : <></>
            )
         })}
         </Container>
            
            <Button onClick={handleShowMore}>Show more</Button>
        </Container>
        </>
    )
}