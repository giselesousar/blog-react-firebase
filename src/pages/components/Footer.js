import React from 'react';
import {Container, NavbarBrand, Navbar} from 'react-bootstrap';

export default function FooterComponent(){
    return(
        <footer>
        <Container>
            <small>&copy; built by <a style={{color: "#ccc"}} href="https://github.com/giselesousar">Gisele Ribeiro</a> </small>
        </Container>
    </footer>
       
    )
}