import React, {useState, useEffect} from 'react';
import FirebaseService from '../../Firebase/firebaseService';
import {Container, Button, Row, Col} from 'react-bootstrap';
import CardComponent from '../components/Card';
import Navbar from '../components/Navbar'
import './styles.css';
import FooterComponent from '../components/Footer';


export default function Home(){
    const [postData, setPostData] = useState([]);
    const [numberPosts, setNumberPosts] = useState(10);
    const [isDisabled, setIsDisabled] = useState(true);
    const [count, setCount] = useState(0);

    function handleShowMore(){
        setNumberPosts(numberPosts + 10);
    }

    useEffect(() => {
        FirebaseService.getDataList('posts', (dataReceived) => setPostData(dataReceived), numberPosts);
        FirebaseService.getCount('posts', (countReceived) => setCount(countReceived));
        (count > numberPosts) ? setIsDisabled(false) : setIsDisabled(true);
    }, [numberPosts, count]) 
    return(
        <>
        <Navbar />
        <Container className="content">
            <Container style={{textAlign: "center"}} className="top-page justify-content-center">
                <h3>Latest posts</h3>
            </Container>
            <Container  style={{
                minHeight:"20rem",
                textAlign: "center"
            }}>
                <Row className="justify-content-center row-container"
                style={{
                    marginTop: "3em",
                    textAlign:"center",
                }}
                >
                    
            {postData.map((post) => {
            return (
            (post.visible) ? <Col> <CardComponent 
                        className="card" 
                        title={post.title} 
                        content={post.content} 
                        date={post.created_at} 
                        slug={post.slug}
                    /> </Col>
                        : <></>
            )
         })}
         
         </Row>
         </Container>
         <Container style={{textAlign: "center"}}className="button-showmore justify-content-center">
            <Button variant="secondary" disabled={isDisabled} onClick={handleShowMore}>Show more</Button>
         </Container>
         
        </Container>
    <FooterComponent />
        </>
    )
}