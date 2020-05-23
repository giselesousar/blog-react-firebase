import React from 'react';
import {Container, Navbar, NavbarBrand} from 'react-bootstrap';

export default function FooterComponent(){
    return(
        <> 
        <hr />
        <Navbar expand="lg" className="footer navbar-fixed-bottom" style={{
            position: "absolute",
            width:"100%",
            height: "20px",
            backgroundColor: "transparent",
        }}>
        <Container className="justify-content-center" style={{color: "#454545", textAlign: "center"}}>
            <NavbarBrand style={{fontSize: "15px"}}>&copy; built by <a style={{color: "#616161"}} href="https://github.com/giselesousar">Gisele Ribeiro</a> </NavbarBrand>
        </Container>
    </Navbar>
    </>
       
    )
}