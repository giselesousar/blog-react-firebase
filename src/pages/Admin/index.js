import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { firebaseImpl, firebaseDatabase } from '../Firebase/firebaseUtils';
import { Container, Form, Button, Spinner, Row, Col, Navbar, Modal } from 'react-bootstrap';
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

            {!isSignedIn &&
                <Container className="center-block">
                    <h1>Admin Page</h1>
                    <Container className="form-login-container justify-content-center">
                        <Form onSubmit={handleSubmit}>
                            <Form.Control
                                type="email"
                                placeholder="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="form-login-input"
                            />
                            <Form.Control
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="form-login-input"
                            />
                            <Button style={{ width: "100%", marginBottom: "10px" }} type="submit">sign in</Button>
                        </Form>
                    </Container>
                    {loading && <Container className="loading-container"><Spinner animation="border" variant="primary" /></Container>}
                </Container>
            }
            {isSignedIn &&
                <>
                    <Navbar>
                        <Navbar.Brand >Admin Page</Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                <Button onClick={handleLogout} >Logout</Button>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Navbar>
                    <Row>
                        <Col className="col-2">
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
                                        className="form-textarea"
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
                    <Modal.Dialog>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal title</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>Modal body text goes here.</p>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary">Close</Button>
                            <Button variant="primary">Save changes</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </>
            }
            {error && <p>{error}</p>}
        </div>
    )
}