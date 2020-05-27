import React from 'react';
import { Card, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
//import img from '../assets/image.svg';

export default function CardComponent(props) {
    return (
        <Card inline className="shadow-sm card">
            {/**<Card.Img variant="top" src={img} />*/}
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <hr />
                <Card.Text>
                    {(props.content).substring(0, 100)+"..."}
                </Card.Text>
                <Card.Text>
                    {props.date}
                </Card.Text>
                <Button style={{backgroundColor: "#8aa163", borderColor: "transparent"}}><Link style= {{color: "#fff"}}  className="links-post" to={{
                    pathname: `/post/${props.slug}`,
                    state: { title: props.title, content:props.content, date: props.date }
                }}> See post </Link></Button>
            </Card.Body>
        </Card>
    )
}