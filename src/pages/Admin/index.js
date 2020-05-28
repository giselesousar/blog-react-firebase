import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { firebaseImpl, firebaseDatabase, firebaseStorage } from '../Firebase/firebaseUtils';
import { Container, Form, Button, Spinner, Row, Col, Navbar, Image } from 'react-bootstrap';
import TableComponent from '../components/Table';
import './styles.css';
import slugify from 'slugify';

export default function Admin() {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    //const [imageAsFile, setImageAsFile] = useState('')
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

        var ref = firebaseDatabase.ref('posts').push();
        const slug = slugify(title);
        ref.set({ title: title, slug: slug, content: content, created_at: Date.now(), visible: isChecked })
            .then(() => {
                setTitle('');
                setContent('');
                setIsChecked(false);
            })
            .catch(function (err) {
                setError(err);
            })
        /**    
        var key = ref.key;
        firebaseStorage.ref().child(`images/${key}.png`).put(imageAsFile)
            .catch(function(err){
                setError(err);
            });
         */

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
   /** function handleImage(e){
        const image = e.target.files[0]
        setImageAsFile(imageFile => (image))
    };
     */

    return (
        <div>
           
            {!isSignedIn &&
            <Container fluid className="center-block">
                <h1>Admin Page</h1>
                <Container className="form-login-container justify-content-center">
                <Form onSubmit={handleSubmit}>
                    <Form.Control
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{marginBottom:"5px"}}
                    />
                    <Form.Control
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{marginBottom:"5px"}}
                    />
                    <Button style={{width: "100%", marginBottom:"10px"}} type="submit">sign in</Button>
                </Form>
                </Container>
                {loading && <Spinner animation="border" variant="primary" />}
                </Container>
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
                            {/**<Form.File id="formcheck-api-regular">
                                <Form.File.Label>Adicionar imagem</Form.File.Label>
                                <Form.File.Input accept='image/*' required onChange={handleImage}/>
                            </Form.File>*/}
                            <Button type="submit">Add</Button>
                        </Form>
                        <Image style={{width: "60%"}} />
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