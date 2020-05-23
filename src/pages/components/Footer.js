import React from 'react';
import {Container} from 'react-bootstrap';

export default function FooterComponent(){
    return(
        <> 
        <footer className="footer navbar-fixed-bottom" style={{
            position: "absolute",
            width:"100%",
            height: "100px",
            backgroundColor: "red",
        }}>
        <Container style={{color: "#fff"}}>
            <small>&copy; built by <a style={{color: "#ccc"}} href="https://github.com/giselesousar">Gisele Ribeiro</a> </small>
        </Container>
    </footer>
    </>
       
    )
}