import React from 'react';
import { Card, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function CardComponent(props) {
    return (
        <Card inline style={{ width: '20rem' }} className="shadow-sm">
            <Card.Img variant="top" src={props.img} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <hr />
                <Card.Text>
                    {props.date}
                </Card.Text>
                <Button style={{backgroundColor: "#8aa163", borderColor: "transparent"}}><Link style= {{color: "#fff"}} to={{
                    pathname: '/post',
                    state: { title: props.title, content:props.content, date: props.date }
                }}> See post </Link></Button>
            </Card.Body>
        </Card>
    )
}