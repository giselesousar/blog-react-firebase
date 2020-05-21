import React from 'react';
import { Card, Button} from 'react-bootstrap';
import img from '../assets/image.svg';
import {Link} from 'react-router-dom';

export default function CardComponent(props) {
    return (
        <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src={img} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <hr />
                <Card.Text>
                    {props.date}
                </Card.Text>
                <Button variant="link"><Link to={{
                    pathname: '/post',
                    state: { title: props.title, content:props.content, date: props.date }
                }}> See post </Link></Button>
            </Card.Body>
        </Card>
    )
}