import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {firebaseImpl, firebaseDatabase} from '../Firebase/firebaseUtils';
import {Form, Button, Spinner} from 'react-bootstrap';
import TableComponent from '../components/Table';

export default function Admin(){

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    //const [category, setCategory] = useState('');

    //const [postData, setPostData] = useState([[]]);

    useEffect(() => {
    }) 

    function handleSubmit(e){
        setLoading(true);
        e.preventDefault();

        firebaseImpl.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                setLoading(false);
                setIsSignedIn(true);
            })
            .catch(function(err){
                setError(err);
            })

    }
    function handleVisible(){
        setIsVisible(true);
    }
    function handleNewPost(e){
        e.preventDefault();

        firebaseDatabase.ref('posts').push().set({title:title, content:content, created_at: Date.now(), visible: isVisible})
            .then(() => {
                setTitle('');
                setContent('');
            })
            .catch(function(err){
                setError(err);
            })
    }
    function handleLogout(){
        firebaseImpl.auth().signOut()
        .then(() => {
            history.push('/')
        })
        .catch(function(err){
            setError(err)
        })
    }

    return(
        <div>
            <h1>Admin</h1>
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
            {!isSignedIn && loading &&   <Spinner animation="border" variant="primary" />
}
            {isSignedIn && 
            <>
                <Form onSubmit={handleNewPost}>
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
                        <Form.Check type="checkbox" onChange={handleVisible} label="Visible" />
                    </Form.Group>
                    <Button type="submit">Add</Button>
                </Form>
                <TableComponent />
                <Button onClick={handleLogout}>Logout</Button>
                </>
            }
            {error && <p>{error}</p>}
        </div>
    )
}