import React from 'react';
import {Container, Image} from 'react-bootstrap';
import img from '../assets/image.svg'

export default function Post(props){
    return(
        <Container>
            <h1>{props.location.state.title}</h1>
            <hr/>
            <strong>{props.location.state.date}</strong>
            <hr/>
            <Image src={img} style={{width: "80%"}} fluid />
            <p>{props.location.state.content}</p>
        </Container>
    )
}