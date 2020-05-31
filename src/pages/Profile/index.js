import React, { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { UserContext } from '../../providers/UserProvider';
import {Navbar, Button, Col, Row, Form} from 'react-bootstrap';
import TableComponent from '../components/Table';
import {firebaseAuth, firebaseDatabase} from '../../Firebase/firebaseUtils';
import slugify from 'slugify';

export default function Profile(){
    const user = useContext(UserContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState(null);

    const history = useHistory();

    function handleLogout(){
        firebaseAuth.signOut()
            .then(() => {
                history.push('/signin')
            })
            .catch(function (err) {
                setError(err)
            })
    }
    function handleNewPost(e){
        e.preventDefault();
        if(user !== null){
        var user = firebaseAuth.currentUser;
        var ref = firebaseDatabase.ref('posts').push();
        const slug = slugify(title);
        ref.set({ title: title, slug: slug, content: content, created_at: Date.now(), visible: isChecked, author: user.uid })
            .then(() => {
                setTitle('');
                setContent('');
                setIsChecked(false);
            })
            .catch(function (err) {
                setError(err);
            })
        }
    }
    function handleChecked(){
        isChecked ? setIsChecked(false) : setIsChecked(true);
    }

    return(
        <>
             <Navbar>
                <Navbar.Brand href="#home">Profile</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <Button onClick={handleLogout} >Logout</Button>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
                <Row>
                    <Col className="coluna-1">
                    <p>{user.email}</p>
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
                            {/**<Form.File id="formcheck-api-regular">
                                <Form.File.Label>Adicionar imagem</Form.File.Label>
                                <Form.File.Input accept='image/*' required onChange={handleImage}/>
                            </Form.File>*/}
                            <Button type="submit">Add</Button>
                        </Form>
                    </Col>
                    <Col className="coluna-2">
                        <TableComponent />
                    </Col>
                </Row>
                        {error && <p>{error}</p>}
        </>
        
    )
}