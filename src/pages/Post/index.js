import React, { useState } from 'react';
import {Container, Image} from 'react-bootstrap';
//import img from '../assets/image.svg'
import Navbar from '../components/Navbar'
import FooterComponent from '../components/Footer';
import './styles.css'
export default function Post(props){

    return(
        <>
        <Navbar />
        {(props.location.state !== undefined) &&
        <Container className="content-center" style={{}} >
            <h1>{props.location.state.title}</h1>
            <span>{`Created at ${props.location.state.date}`}</span>
            <hr/>
            {/**
            <div className="justify-content-center image" style={{textAlign:"center"}}>
                <Image src={img} className="image" style={{}} fluid />
            </div>
             */}
            <div className="paragrafo-container" style={{marginTop: "3em"}}>
                {((props.location.state.content).split('\n')).map(p => {
                    return <p>{p}</p>
                })}
            </div>
        </Container>
        }
       
        <FooterComponent />
        </>
    )
}