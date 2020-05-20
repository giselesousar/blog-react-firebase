import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {firebaseImpl, firebaseDatabase} from '../Firebase/firebaseUtils';
import {Form, Button} from 'react-bootstrap';

export default function Admin(){

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    //const [category, setCategory] = useState('');

    //const [postData, setPostData] = useState([[]]);

    useEffect(() => {
    }) 

    function handleSubmit(e){
        e.preventDefault();

        firebaseImpl.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                setIsSignedIn(true);
            })
            .catch(function(err){
                setError(err);
            })

    }
    function handleNewPost(e){
        e.preventDefault();

        firebaseDatabase.ref('posts').push().set({title:title, content:content, created_at: Date.now()})
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
            {!isSignedIn && 
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
            {isSignedIn && 
            <>
                <Form onSubmit={handleNewPost}>
                    <Form.Group>
                    <Form.Control 
                        type="text"
                        placeholder="titulo"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Form.Control
                        as="textarea"
                        placeholder="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    </Form.Group>
                    <Button type="submit">Add</Button>
                </Form>
                <Button onClick={handleLogout}>Logout</Button>
                </>
            }
        {error && <p>{error}</p>}
        </div>
    )
}