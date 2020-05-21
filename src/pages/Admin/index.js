import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { firebaseImpl, firebaseDatabase } from '../Firebase/firebaseUtils';
import { Form, Button, Spinner, Row, Col, Navbar } from 'react-bootstrap';
import TableComponent from '../components/Table';
import './styles.css';

export default function Admin() {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    //const [category, setCategory] = useState('');

    //const [postData, setPostData] = useState([[]]);

    useEffect(() => {
    })

    function handleSubmit(e) {
        setLoading(true);
        e.preventDefault();

        firebaseImpl.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                setLoading(false);
                setIsSignedIn(true);
            })
            .catch(function (err) {
                setError(err);
            })

    }

    function handleNewPost(e) {
        e.preventDefault();

        firebaseDatabase.ref('posts').push().set({ title: title, content: content, created_at: Date.now(), visible: isChecked })
            .then(() => {
                setTitle('');
                setContent('');
                setIsChecked(false);
            })
            .catch(function (err) {
                setError(err);
            })
    }
    function handleLogout() {
        firebaseImpl.auth().signOut()
            .then(() => {
                history.push('/')
            })
            .catch(function (err) {
                setError(err)
            })
    }
    function handleChecked() {
        isChecked ? setIsChecked(false) : setIsChecked(true);
    }

    return (
        <div>
           
            {!isSignedIn && !loading &&
                <Form onSubmit={handleSubmit}>
                    <Form.Control
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Control
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit">sign in</Button>
                </Form>
            }
            {!isSignedIn && loading && <Spinner animation="border" variant="primary" />
            }
            {isSignedIn &&
                <>
                 <Navbar>
                <Navbar.Brand href="#home">Admin Page</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <Button onClick={handleLogout} >Logout</Button>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
                <Row>
                    <Col className="coluna-1">
                        <Form onSubmit={handleNewPost} className="form-newpost">
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                                <Form.Control
                                    as="textarea"
                                    placeholder="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check checked={isChecked} type="checkbox" onChange={handleChecked} label="Visible" />
                            </Form.Group>
                            <Button type="submit">Add</Button>
                        </Form>
                    </Col>
                    <Col className="coluna-2">
                        <TableComponent />
                    </Col>
                </Row>
                </>
            }
            {error && <p>{error}</p>}
        </div>
    )
}