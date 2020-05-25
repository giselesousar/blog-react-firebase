import React from 'react';
import {Container, Image} from 'react-bootstrap';
import img from '../assets/image.svg'
import Navbar from '../components/Navbar'
import FooterComponent from '../components/Footer';

export default function Post(props){
    return(
        <>
        <Navbar />
        <Container className="content-center" >
            <h1>{props.location.state.title}</h1>
            <hr/>
            <strong>{props.location.state.date}</strong>
            <hr/>
            <Container className="justify-content-center" style={{textAlign:"center"}}>
            <Image src={img} style={{width: "60%"}} fluid />
            </Container>
            <p>{props.location.state.content}</p>
        </Container>
        <FooterComponent />
        </>
    )
}